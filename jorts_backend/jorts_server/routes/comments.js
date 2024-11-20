const express = require('express');
const router = express.Router();
const commentModel = require('../models/Comment');

// Create a comment
router.post('/', (req, res) => {
  const { userId, content } = req.body;
  commentModel.createComment(userId, content, (err, comment) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(comment);
  });
});

// Get comments by user ID
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  commentModel.getCommentsByUserId(userId, (err, comments) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(comments);
  });
});

// Update a comment
router.put('/:id', (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;
  commentModel.updateComment(commentId, content, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Comment updated', changes: result.changes });
  });
});

// Delete a comment
router.delete('/:id', (req, res) => {
  const commentId = req.params.id;
  commentModel.deleteComment(commentId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Comment deleted', changes: result.changes });
  });
});

module.exports = router;
