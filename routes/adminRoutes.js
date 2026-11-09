const express = require('express');
const router = express.Router();
const db = require('../firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');
const { requireAdmin } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateLogin } = require('../middleware/validateInput');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'pradnyeshk5605@gmail.com';

async function getUserByEmail(email) {
  const snapshot = await db.collection('users').where('email', '==', email).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

/**
 * POST /api/admin/login
 * Admin login — validates role claim in JWT payload after bcrypt check
 */
router.post('/login', authLimiter, validateLogin, async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email !== ADMIN_EMAIL) {
      // Generic message — don't reveal that admin email check failed
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      user: { _id: user.id, email: user.email, role: 'admin', isAdmin: true },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

/**
 * GET /api/admin/dashboard
 * Admin dashboard — protected by verifyToken + requireAdmin (role-based)
 */
router.get('/dashboard', verifyToken, requireAdmin, async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized.' });
    }

    // Fetch users — NEVER return password hashes
    const usersSnapshot = await db.collection('users').get();
    const userRegistrations = usersSnapshot.docs.map(doc => {
      const { password, ...safeData } = doc.data();
      return { id: doc.id, ...safeData };
    });

    // Fetch feedback
    const feedbackSnapshot = await db.collection('feedback').get();
    const feedbacks = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch security logs
    const securityLogsSnapshot = await db.collection('securityLogs')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();
    const securityLogs = securityLogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.json({
      userRegistrations,
      feedbacks,
      securityLogs,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

/**
 * POST /api/admin/unlock/:email
 * Admin can manually unlock a locked account
 */
router.post('/unlock/:email', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { email } = req.params;
    const snapshot = await db.collection('loginAttempts')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      await snapshot.docs[0].ref.update({ attempts: 0, lockedUntil: null });
    }

    // Log admin unlock action
    await db.collection('authLogs').add({
      eventType: 'admin_account_unlock',
      targetEmail: email,
      performedBy: req.user.email,
      timestamp: new Date(),
    });

    res.json({ message: `Account for ${email} has been unlocked.` });
  } catch (error) {
    console.error('Account unlock error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
