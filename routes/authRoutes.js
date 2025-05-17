const express = require('express');
const router = express.Router();
const db = require('../firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const net = require('net');
const tls = require('tls');

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

// Helper: Send email using Gmail SMTP without external modules
async function sendEmail(to, subject, htmlContent) {
  return new Promise((resolve, reject) => {
    const smtpServer = 'smtp.gmail.com';
    const smtpPort = 587;
    const emailUser = process.env.NO_REPLY_EMAIL;
    const emailPass = process.env.NO_REPLY_EMAIL_PASS;

    const socket = net.createConnection(smtpPort, smtpServer, () => {
      socket.write('EHLO smtp.gmail.com\r\n');
    });

    socket.on('data', (data) => {
      const response = data.toString();

      if (response.startsWith('220')) {
        socket.write('STARTTLS\r\n');
      } else if (response.startsWith('250') && response.includes('STARTTLS')) {
        const secureSocket = tls.connect(
          {
            socket,
            host: smtpServer,
            servername: smtpServer, // Ensure the server name is provided for TLS
          },
          () => {
            secureSocket.write(`EHLO smtp.gmail.com\r\n`);
          }
        );

        secureSocket.on('data', (secureData) => {
          const secureResponse = secureData.toString();

          if (secureResponse.startsWith('250')) {
            secureSocket.write(`AUTH LOGIN\r\n`);
          } else if (secureResponse.startsWith('334')) {
            secureSocket.write(Buffer.from(emailUser).toString('base64') + '\r\n');
          } else if (secureResponse.includes('334')) {
            secureSocket.write(Buffer.from(emailPass).toString('base64') + '\r\n');
          } else if (secureResponse.startsWith('235')) {
            secureSocket.write(
              `MAIL FROM:<${emailUser}>\r\nRCPT TO:<${to}>\r\nDATA\r\n`
            );
          } else if (secureResponse.startsWith('354')) {
            secureSocket.write(
              `Subject: ${subject}\r\nContent-Type: text/html\r\n\r\n${htmlContent}\r\n.\r\n`
            );
          } else if (secureResponse.startsWith('250') && secureResponse.includes('OK')) {
            secureSocket.write('QUIT\r\n');
            resolve('Email sent successfully');
          }
        });

        secureSocket.on('error', (err) => {
          console.error('TLS Error:', err);
          reject(err);
        });
      }
    });

    socket.on('error', (err) => {
      console.error('Socket Error:', err);
      reject(err);
    });
  });
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

// Forgot password - send reset link
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email' });
    }
    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // Construct reset link using API_BASE_URL
    const resetLink = `${API_BASE_URL}/reset-password/${resetToken}`;

    // Send email
    const subject = 'Password Reset Request';
    const htmlContent = `
      <p>Hello,</p>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you did not request this, please ignore this email.</p>
    `;
    await sendEmail(email, subject, htmlContent);

    res.json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset password - set new password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Update user password in Firestore
    await db.collection('users').doc(userId).update({ password: hashedPassword });
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

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

const LOCAL_API_BASE_URL = "http://localhost:5000";
const RENDER_API_BASE_URL = "https://wecareehs-backend.onrender.com";

const API_BASE_URL = process.env.USE_RENDER === "true" ? RENDER_API_BASE_URL : LOCAL_API_BASE_URL;

module.exports = router;
