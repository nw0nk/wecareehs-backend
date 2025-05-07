const express = require('express');
const router = express.Router();
const db = require('../firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

const ADMIN_EMAIL = 'pradnyeshk5605@gmail.com';

// Helper: Get user by email from Firestore
async function getUserByEmail(email) {
  const snapshot = await db.collection('users').where('email', '==', email).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Unauthorized admin access' });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({
      token,
      user: {
        _id: user.id,
        email: user.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    if (!db) {
      console.error('Firestore db is not initialized.');
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    // Fetch user registrations from Firestore 'users' collection
    const usersSnapshot = await db.collection('users').get();
    const userRegistrations = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`Fetched ${userRegistrations.length} user registrations`);

    // Fetch feedback form data from Firestore 'feedback' collection
    const feedbackSnapshot = await db.collection('feedback').get();
    const feedbacks = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`Fetched ${feedbacks.length} feedback entries`);

    res.json({
      totalVisits: 1250,
      uniqueVisitors: 530,
      recentActivity: [
        { action: 'System login', timestamp: new Date() }
      ],
      userRegistrations,
      feedbacks
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
