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

// Admin dashboard route
router.get('/admin/dashboard', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized admin access' });
    }

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
