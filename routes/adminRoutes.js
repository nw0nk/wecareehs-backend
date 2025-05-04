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
    res.json({
      totalVisits: 1250,
      uniqueVisitors: 530,
      recentActivity: [
        { action: 'System login', timestamp: new Date() }
      ]
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
