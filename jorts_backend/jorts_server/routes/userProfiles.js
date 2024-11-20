const express = require('express');
const router = express.Router();
const userProfileModel = require('../models/UserProfile');

// Create a user profile
router.post('/', (req, res) => {
  const { userId, bio, socialLinks } = req.body;
  userProfileModel.createUserProfile(userId, bio, socialLinks, (err, profile) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(profile);
  });
});

// Get a user profile by user ID
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  userProfileModel.getUserProfileByUserId(userId, (err, profile) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  });
});

// Update a user profile
router.put('/user/:id', (req, res) => {
  const userId = req.params.id;
  const { bio, socialLinks } = req.body;
  userProfileModel.updateUserProfile(userId, bio, socialLinks, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Profile updated', changes: result.changes });
  });
});

// Delete a user profile
router.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  userProfileModel.deleteUserProfile(userId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Profile deleted', changes: result.changes });
  });
});

module.exports = router;
