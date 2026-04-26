const express = require('express');
const router = express.Router();
const db = require('../firebase');
const admin = require('firebase-admin');

/**
 * POST /api/analytics/visit
 * Public endpoint to track unique visitors
 */
router.post('/visit', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized.' });
    }

    const statsRef = db.collection('analytics').doc('globalStats');
    
    // Atomically increment the total visitors count
    await statsRef.set({
      totalVisitors: admin.firestore.FieldValue.increment(1),
      lastUpdated: new Date()
    }, { merge: true });

    res.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
