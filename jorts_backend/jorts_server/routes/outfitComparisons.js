const express = require('express');
const router = express.Router();
const outfitComparisonModel = require('../models/OutfitComparison');

// Add an outfit comparison
router.post('/', (req, res) => {
  const { userId, outfitName } = req.body;
  outfitComparisonModel.addOutfitComparison(userId, outfitName, (err, comparison) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(comparison);
  });
});

// Get outfit comparisons by user ID
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  outfitComparisonModel.getOutfitComparisonsByUserId(userId, (err, comparisons) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(comparisons);
  });
});

// Delete an outfit comparison
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  outfitComparisonModel.deleteOutfitComparison(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Outfit comparison deleted', changes: result.changes });
  });
});

module.exports = router;
