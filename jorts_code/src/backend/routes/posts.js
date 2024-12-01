const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const Post = require('../models/Post');
const User = require('../models/User');

// @route   POST /api/posts
// @desc    Create a new post with image upload
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { caption, items } = req.body;
    
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Check if user has already posted today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingPost = await Post.findOne({
      userId: req.user._id,
      uploadDate: {
        $gte: today,
      },
    });

    if (existingPost) {
      return res.status(400).json({ message: 'You can only post once per day' });
    }

    // Parse items if they were sent as a string
    let parsedItems = items;
    if (typeof items === 'string') {
      try {
        parsedItems = JSON.parse(items);
      } catch (error) {
        console.error('Error parsing items:', error);
        parsedItems = [];
      }
    }

    const post = await Post.create({
      userId: req.user._id,
      image: req.file.path,
      caption,
      items: parsedItems,
    });

    // Update user's post count and last upload date
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalPosts: 1 },
      lastUploadDate: new Date(),
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts
// @desc    Get posts for voting (returns two random posts)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Get two random posts that haven't been voted on much
    const posts = await Post.aggregate([
      { $sample: { size: 2 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          image: 1,
          caption: 1,
          items: 1,
          votes: 1,
          uploadDate: 1,
          'user.username': 1,
        },
      },
    ]);

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/posts/:id/vote
// @desc    Vote on a post
// @access  Private
router.post('/:id/vote', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.votes += 1;
    await post.save();

    res.json({ votes: post.votes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/posts/:id/comment
// @desc    Comment on a post
// @access  Private
router.post('/:id/comment', protect, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      userId: req.user._id,
      text,
    };

    post.comments.unshift(newComment);
    await post.save();

    // Populate the user data before sending response
    const populatedPost = await Post.findById(post._id)
      .populate('comments.userId', 'username')
      .populate('comments.replies.userId', 'username');

    // Send back only the new comment with populated user data
    const populatedComment = populatedPost.comments[0];

    res.json(populatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts/user/:userId
// @desc    Get all posts by a user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'username');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;