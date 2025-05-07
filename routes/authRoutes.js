const express = require('express');
const router = express.Router();
const db = require('../firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = 'pradnyeshk5605@gmail.com';

// Helper: Get user by email from Firestore
async function getUserByEmail(email) {
  const snapshot = await db.collection('users').where('email', '==', email).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

// Helper: Log auth event to Firestore
async function logAuthEvent(userId, email, eventType) {
  try {
    await db.collection('authLogs').add({
      userId,
      email,
      eventType, // 'login' or 'logout'
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error logging auth event:', error);
  }
}

// Normal user login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Please use admin login portal' });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    // Log login event
    await logAuthEvent(user.id, user.email, 'login');
    res.json({
      token,
      user: {
        _id: user.id,
        email: user.email,
        role: user.role || 'user'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Admin login route
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Unauthorized admin access' });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
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
    // Log admin login event
    await logAuthEvent(user.id, user.email, 'login');
    res.json({
      token,
      user: {
        _id: user.id,
        email: user.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


const verifyToken = require('../middleware/auth');

router.get('/admin/dashboard', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized admin access' });
    }

    if (!db) {
      console.error('Firestore db is not initialized.');
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    // Fetch user registrations from Firestore 'users' collection
    const usersSnapshot = await db.collection('users').get();
    const userRegistrations = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`Fetched ${userRegistrations.length} user registrations`);
    if (userRegistrations.length === 0) {
      console.warn('Warning: No user registrations found in Firestore.');
    }

    // Fetch feedback form data from Firestore 'feedback' collection
    const feedbackSnapshot = await db.collection('feedback').get();
    const feedbacks = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`Fetched ${feedbacks.length} feedback entries`);
    if (feedbacks.length === 0) {
      console.warn('Warning: No feedback entries found in Firestore.');
    }

    // Fetch auth logs from Firestore 'authLogs' collection
    const logsSnapshot = await db.collection('authLogs').orderBy('timestamp', 'desc').limit(100).get();
    const authLogs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`Fetched ${authLogs.length} authentication logs`);
    if (authLogs.length === 0) {
      console.warn('Warning: No authentication logs found in Firestore.');
    }

    res.json({
      userRegistrations,
      feedbacks,
      authLogs
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// New route to fetch auth logs for admin
router.get('/admin/auth-logs', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized admin access' });
    }

    if (!db) {
      console.error('Firestore db is not initialized.');
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const logsSnapshot = await db.collection('authLogs').orderBy('timestamp', 'desc').limit(100).get();
    const authLogs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`Fetched ${authLogs.length} authentication logs`);
    if (authLogs.length === 0) {
      console.warn('Warning: No authentication logs found in Firestore.');
    }

    res.json({ authLogs });
  } catch (error) {
    console.error('Auth logs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// User dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is normal user
    if (decoded.role !== 'user') {
      return res.status(403).json({ error: 'Unauthorized user access' });
    }

    // Return user dashboard data
    res.json({
      welcomeMessage: `Welcome, user ${decoded.email}`,
      recentOrders: [],
      notifications: [],
      stats: {
        totalOrders: 10,
        pendingOrders: 2,
        completedOrders: 8
      }
    });
  } catch (error) {
    console.error('User dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


// Registration route
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, company } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['firstName', 'lastName', 'email', 'password', 'phone']
      });
    }

    // Check if user already exists
    let user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newUser = {
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      phone,
      company: company || '',
      role: 'user',
      createdAt: new Date(),
      isAdmin: false
    };

    // Add user to Firestore
    const docRef = await db.collection('users').add(newUser);

    // Create JWT token
    const token = jwt.sign(
      { userId: docRef.id, email: email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(201).json({
      token,
      user: {
        _id: docRef.id,
        email,
        role: 'user'
      }
    });
  } catch (error) {
    // Log the full error for debugging
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message // Always include the error message for debugging
    });
  }
});

module.exports = router;
