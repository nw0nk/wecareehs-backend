const express = require('express');
const router = express.Router();
const db = require('../firebase');
const { feedbackLimiter } = require('../middleware/rateLimiter');

// POST /api/feedback - Add feedback (full schema) with spam rate limiting
router.post('/', feedbackLimiter, async (req, res) => {
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
    console.error('Feedback submission error:', err);
    // Suppress raw database stack trace messages in production payloads
    res.status(500).json({ success: false, error: 'Internal server error occurred.' });
  }
});

// GET /api/feedback - Get all feedback
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('feedback').orderBy('createdAt', 'desc').get();
    const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(feedbacks);
  } catch (err) {
    console.error('Feedback listing error:', err);
    res.status(500).json({ success: false, error: 'Internal server error occurred.' });
  }
});

module.exports = router;