const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const Post = require('../models/Post');
const PostPair = require('../models/PostPair');

// Unprotected version of voting routes
router.get('/pairs', async (req, res) => {
  try {
    let pair = await PostPair.findOne({ active: true })
      .populate('post1 post2', 'image caption items userId')
      .populate({
        path: 'post1',
        populate: { path: 'userId', select: 'username' }
      })
      .populate({
        path: 'post2',
        populate: { path: 'userId', select: 'username' }
      });

    if (!pair) {
      const posts = await Post.aggregate([
        { $sample: { size: 2 } }
      ]);

      if (posts.length < 2) {
        return res.status(404).json({ message: 'Not enough posts for voting' });
      }

      pair = await PostPair.create({
        post1: posts[0]._id,
        post2: posts[1]._id
      });

      pair = await PostPair.findById(pair._id)
        .populate('post1 post2', 'image caption items userId')
        .populate({
          path: 'post1',
          populate: { path: 'userId', select: 'username' }
        })
        .populate({
          path: 'post2',
          populate: { path: 'userId', select: 'username' }
        });
    }

    res.json(pair);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unprotected vote endpoint with test user
router.post('/vote', async (req, res) => {
  try {
    const { pairId, postId } = req.body;
    const testUserId = '123456789012345678901234'; // Will be created by seed data

    const pair = await PostPair.findById(pairId);
    if (!pair) {
      return res.status(404).json({ message: 'Pair not found' });
    }

    const existingVote = await Vote.findOne({
      userId: testUserId,
      pairId
    });

    if (existingVote) {
      return res.status(400).json({ message: 'Already voted on this pair' });
    }

    if (!pair.post1.equals(postId) && !pair.post2.equals(postId)) {
      return res.status(400).json({ message: 'Invalid post for this pair' });
    }

    await Vote.create({
      userId: testUserId,
      postId,
      pairId
    });

    if (pair.post1.equals(postId)) {
      pair.post1Votes += 1;
    } else {
      pair.post2Votes += 1;
    }

    const totalVotes = pair.post1Votes + pair.post2Votes;
    if (totalVotes >= 10) {
      pair.active = false;
    }

    await pair.save();
    await Post.findByIdAndUpdate(postId, { $inc: { votes: 1 } });

    res.json({
      post1Votes: pair.post1Votes,
      post2Votes: pair.post2Votes,
      totalVotes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;