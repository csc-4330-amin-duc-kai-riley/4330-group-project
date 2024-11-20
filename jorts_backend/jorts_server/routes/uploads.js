const express = require('express');
const router = express.Router();
const uploadModel = require('../models/Uploadimage');

// Create an upload
router.post('/', (req, res) => {
  const { userId, imagePath } = req.body;
  uploadModel.createUpload(userId, imagePath, (err, upload) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(upload);
  });
});

// Get uploads by user ID
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  uploadModel.getUploadsByUserId(userId, (err, uploads) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(uploads);
  });
});

// Delete an upload
router.delete('/:id', (req, res) => {
  const uploadId = req.params.id;
  uploadModel.deleteUpload(uploadId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Upload deleted', changes: result.changes });
  });
});

module.exports = router;
