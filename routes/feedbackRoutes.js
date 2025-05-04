const express = require('express');
const router = express.Router();
const db = require('../firebase');

// POST /api/feedback - Add feedback (full schema)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      company,
      trainingTitle,
      date,
      place,
      trainer,
      ratings,
      overall,
      comment
    } = req.body;
    const docRef = await db.collection('feedback').add({
      name,
      company,
      trainingTitle,
      date,
      place,
      trainer,
      ratings,
      overall,
      comment,
      createdAt: new Date()
    });
    res.json({ success: true, id: docRef.id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/feedback - Get all feedback
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('feedback').orderBy('createdAt', 'desc').get();
    const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router; 