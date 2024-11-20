const express = require('express');
const router = express.Router();
const sessionModel = require('../models/Session');

// Create a session
router.post('/', (req, res) => {
  const { userId, token, expiresAt } = req.body;
  sessionModel.createSession(userId, token, expiresAt, (err, session) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(session);
  });
});

// Get a session by token
router.get('/:token', (req, res) => {
  const token = req.params.token;
  sessionModel.getSessionByToken(token, (err, session) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  });
});

// Delete a session
router.delete('/:token', (req, res) => {
  const token = req.params.token;
  sessionModel.deleteSession(token, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Session deleted', changes: result.changes });
  });
});

module.exports = router;
