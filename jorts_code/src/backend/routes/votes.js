const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Vote = require('../models/Vote');
const Post = require('../models/Post');
const PostPair = require('../models/PostPair');

// @route   GET /api/votes/pairs
// @desc    Get a pair of posts to vote on
// @access  Public
router.get('/pairs', async (req, res) => {
  try {
    const { page = 1, direction = 'next' } = req.query;
    const pageSize = 1; // One pair per page

    // Find all active pairs with pagination
    const pairs = await PostPair.find({ active: true })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select('post1 post2 post1Votes post2Votes') // Select specific fields
      .populate('post1 post2', 'image caption items userId')
      .populate({
        path: 'post1',
        populate: { path: 'userId', select: 'username' },
      })
      .populate({
        path: 'post2',
        populate: { path: 'userId', select: 'username' },
      });

    console.log('Pairs from database:', JSON.stringify(pairs, null, 2));

    // If no pair exists at this page, create a new one
    if (pairs.length === 0) {
      // Get two random posts that haven't been paired
      const posts = await Post.aggregate([{ $sample: { size: 2 } }]);

      if (posts.length < 2) {
        return res.status(404).json({ message: 'Not enough posts for voting' });
      }

      const newPair = await PostPair.create({
        post1: posts[0]._id,
        post2: posts[1]._id,
        post1Votes: 0,
        post2Votes: 0,
      });

      // Populate the new pair
      const populatedPair = await PostPair.findById(newPair._id)
        .select('post1 post2 post1Votes post2Votes')
        .populate('post1 post2', 'image caption items userId')
        .populate({
          path: 'post1',
          populate: { path: 'userId', select: 'username' },
        })
        .populate({
          path: 'post2',
          populate: { path: 'userId', select: 'username' },
        });

      // Get total pages
      const totalPairs = await PostPair.countDocuments({ active: true });

      return res.json({
        pair: populatedPair,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil((totalPairs + 1) / pageSize),
          hasNext: true,
          hasPrevious: page > 1,
        },
      });
    }

    // Get total pages
    const totalPairs = await PostPair.countDocuments({ active: true });

    res.json({
      pair: pairs[0],
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalPairs / pageSize),
        hasNext: page < Math.ceil(totalPairs / pageSize),
        hasPrevious: page > 1,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/votes/vote
// @desc    Submit a vote for a post in a pair
// @access  Private
router.post('/vote', protect, async (req, res) => {
  try {
    const { pairId, postId } = req.body;

    // Validate the pair exists
    const pair = await PostPair.findById(pairId);
    if (!pair) {
      return res.status(404).json({ message: 'Pair not found' });
    }

    // Check if user has already voted on this pair
    const existingVote = await Vote.findOne({
      userId: req.user._id,
      pairId,
    });

    if (existingVote) {
      return res.status(400).json({ message: 'Already voted on this pair' });
    }

    // Validate the voted post is part of the pair
    if (!pair.post1.equals(postId) && !pair.post2.equals(postId)) {
      return res.status(400).json({ message: 'Invalid post for this pair' });
    }

    // Create the vote
    await Vote.create({
      userId: req.user._id,
      postId,
      pairId,
    });

    // Update vote counts
    if (pair.post1.equals(postId)) {
      pair.post1Votes += 1;
    } else {
      pair.post2Votes += 1;
    }

    // If enough votes received, mark pair as inactive
    const totalVotes = pair.post1Votes + pair.post2Votes;
    if (totalVotes >= 10) {
      pair.active = false;
    }

    await pair.save();

    // Update the post's total votes
    await Post.findByIdAndUpdate(postId, { $inc: { votes: 1 } });

    // Fetch updated pair with populated data
    const updatedPair = await PostPair.findById(pairId)
      .select('post1 post2 post1Votes post2Votes')
      .populate('post1 post2', 'image caption items userId')
      .populate({
        path: 'post1',
        populate: { path: 'userId', select: 'username' },
      })
      .populate({
        path: 'post2',
        populate: { path: 'userId', select: 'username' },
      });

    res.json({
      message: 'Vote recorded successfully',
      pair: updatedPair,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/votes/stats
// @desc    Get voting statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalVotes = await Vote.countDocuments();
    const totalPairs = await PostPair.countDocuments();
    const activePairs = await PostPair.countDocuments({ active: true });
    const completedPairs = await PostPair.countDocuments({ active: false });

    const topPosts = await Post.aggregate([
      { $sort: { votes: -1 } },
      { $limit: 5 },
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
          votes: 1,
          'user.username': 1,
        },
      },
    ]);

    // If user is authenticated, check if they've voted
    let userVotes = [];
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      userVotes = await Vote.find({ userId: decoded.id }).select('pairId');
    }

    res.json({
      totalVotes,
      totalPairs,
      activePairs,
      completedPairs,
      topPosts,
      userVotes: userVotes.map((vote) => vote.pairId), // Return the list of pair IDs the user has voted on
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
