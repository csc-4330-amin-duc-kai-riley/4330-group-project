const express = require('express');
const router = express.Router();
const voteModel = require('../models/Vote');

// Create a vote
router.post('/', (req, res) => {
  const { userId, pageId } = req.body;
  voteModel.createVote(userId, pageId, (err, vote) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(vote);
  });
});

// Get votes by user ID
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  voteModel.getVotesByUserId(userId, (err, votes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(votes);
  });
});

// Delete a vote
router.delete('/', (req, res) => {
  const { userId, pageId } = req.body;
  voteModel.deleteVote(userId, pageId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Vote deleted', changes: result.changes });
  });
});

module.exports = router;
