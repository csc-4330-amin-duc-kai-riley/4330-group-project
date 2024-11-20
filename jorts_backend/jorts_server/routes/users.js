const express = require('express');
const router = express.Router();
const userModel = require('../models/User');

// Create a new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  userModel.createUser(username, password, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(user);
  });
});

// Get a user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  userModel.getUserById(userId, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  });
});

// Update a user
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  userModel.updateUser(userId, updates, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated', changes: result.changes });
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  userModel.deleteUser(userId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted', changes: result.changes });
  });
});

module.exports = router;
