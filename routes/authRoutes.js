const express = require('express');
const router = express.Router();
const db = require('../firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const verifyToken = require('../middleware/auth');
const { authLimiter, forgotPasswordLimiter } = require('../middleware/rateLimiter');

const ADMIN_EMAIL = 'pradnyeshk5605@gmail.com';

// Helper: Get user by email from Firestore
async function getUserByEmail(email) {
  const snapshot = await db.collection('users').where('email', '==', email).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

// ── USER PROFILE (username + photo) ─────────────────────────────────────────
// Usernames: 3–20 chars, letters/numbers/underscore, starting with a letter.
const USERNAME_RE = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

function isValidUsername(username) {
  return typeof username === 'string' && USERNAME_RE.test(username.trim());
}

// Case-insensitive uniqueness check (backed by the usernameLower field)
async function isUsernameAvailable(username, excludeUserId) {
  const lower = username.trim().toLowerCase();
  const snap = await db.collection('users').where('usernameLower', '==', lower).limit(2).get();
  if (snap.empty) return true;
  const dupe = snap.docs[0];
  return dupe.id === excludeUserId;
}

// Profile photo: an https image URL, or a small JPEG/PNG data URL (avatars
// are downscaled to 256×256 on the client, so they stay well under the cap).
function isValidPfpUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('data:image/jpeg;base64,') || url.startsWith('data:image/png;base64,')) {
    return url.length < 350 * 1024; // ≈ 250 KB
  }
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

// Shape sent to clients — never password hashes or internal auth fields
function publicUser(user) {
  return {
    _id: user.id || user._id,
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    company: user.company || '',
    username: user.username || '',
    pfpUrl: user.pfpUrl || '',
    role: user.role || 'user',
  };
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

// Helper: Send email using Nodemailer
async function sendEmail(to, subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wecareehs@gmail.com', // Domain email
      pass: process.env.NO_REPLY_EMAIL_PASS, // App password for Gmail
    },
  });

  const mailOptions = {
    from: '"WeCareEHS Support" <wecareehs@gmail.com>',
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Failed to send email');
  }
}

// Helper: Parse Firestore Timestamp or standard JS Date safely
function parseLockTime(lockTime) {
  if (!lockTime) return null;
  if (typeof lockTime.toDate === 'function') {
    return lockTime.toDate();
  }
  return new Date(lockTime);
}

// Normal user login route with brute force protection and rate limiting
router.post('/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Please use admin login portal' });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // ─── BRUTE FORCE LOCK CHECK ───
    const lockTime = parseLockTime(user.lockUntil);
    if (lockTime && lockTime > new Date()) {
      const remainingMinutes = Math.ceil((lockTime - new Date()) / 60000);
      return res.status(403).json({
        error: `Account temporarily locked due to multiple failed login attempts. Please try again in ${remainingMinutes} minute(s).`
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const newFailedAttempts = (user.failedAttempts || 0) + 1;
      const updates = { failedAttempts: newFailedAttempts };

      if (newFailedAttempts >= 5) {
        updates.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15-minute lock
        updates.failedAttempts = 0; // Reset for post-lock attempts
        await db.collection('users').doc(user.id).update(updates);
        return res.status(403).json({
          error: 'Account locked due to 5 consecutive failed login attempts. Please try again after 15 minutes.'
        });
      } else {
        await db.collection('users').doc(user.id).update(updates);
        const remaining = 5 - newFailedAttempts;
        return res.status(401).json({ error: `Invalid credentials. (${remaining} attempt(s) remaining)` });
      }
    }

    // Reset failed count on successful authentication
    if (user.failedAttempts > 0 || user.lockUntil) {
      await db.collection('users').doc(user.id).update({
        failedAttempts: 0,
        lockUntil: null
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    await logAuthEvent(user.id, user.email, 'login');
    res.json({
      token,
      user: publicUser(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during authentication.' });
  }
});

// ── Update profile: username (unique) + photo ───────────────────────────────
router.patch('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, pfpUrl } = req.body || {};
    const userRef = db.collection('users').doc(userId);
    const snap = await userRef.get();
    if (!snap.exists) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const updates = {};

    if (username !== undefined) {
      const trimmed = String(username || '').trim();
      if (trimmed) {
        if (!isValidUsername(trimmed)) {
          return res.status(400).json({
            error: 'Username must be 3–20 characters: letters, numbers and underscores, starting with a letter.',
          });
        }
        if (!(await isUsernameAvailable(trimmed, userId))) {
          return res.status(409).json({ error: 'This username is already taken.' });
        }
        updates.username = trimmed;
        updates.usernameLower = trimmed.toLowerCase();
      } else {
        updates.username = '';
        updates.usernameLower = '';
      }
    }

    if (pfpUrl !== undefined) {
      const url = String(pfpUrl || '').trim();
      if (url && !isValidPfpUrl(url)) {
        return res.status(400).json({
          error: 'Photo must be an image URL or a file under ~250 KB.',
        });
      }
      updates.pfpUrl = url;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Nothing to update.' });
    }

    await userRef.update(updates);
    const fresh = (await userRef.get()).data();
    res.json({ user: publicUser({ id: userId, ...fresh }) });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Could not update profile.' });
  }
});

// Admin login route with brute force protection and rate limiting
router.post('/admin/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Unauthorized admin access' });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // ─── ADMIN BRUTE FORCE LOCK CHECK ───
    const lockTime = parseLockTime(user.lockUntil);
    if (lockTime && lockTime > new Date()) {
      const remainingMinutes = Math.ceil((lockTime - new Date()) / 60000);
      return res.status(403).json({
        error: `Admin access temporarily locked due to multiple failed login attempts. Please try again in ${remainingMinutes} minute(s).`
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const newFailedAttempts = (user.failedAttempts || 0) + 1;
      const updates = { failedAttempts: newFailedAttempts };

      if (newFailedAttempts >= 5) {
        updates.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15-minute lock
        updates.failedAttempts = 0;
        await db.collection('users').doc(user.id).update(updates);
        return res.status(403).json({
          error: 'Admin access locked due to 5 consecutive failed login attempts. Please try again after 15 minutes.'
        });
      } else {
        await db.collection('users').doc(user.id).update(updates);
        const remaining = 5 - newFailedAttempts;
        return res.status(401).json({ error: `Invalid credentials. (${remaining} attempt(s) remaining)` });
      }
    }

    // Reset failed count on successful authentication
    if (user.failedAttempts > 0 || user.lockUntil) {
      await db.collection('users').doc(user.id).update({
        failedAttempts: 0,
        lockUntil: null
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

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

// Admin dashboard route
router.get('/admin/dashboard', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized admin access' });
    }

    if (!db) {
      return res.status(500).json({ error: 'Database service unavailable' });
    }

    const usersSnapshot = await db.collection('users').get();
    const userRegistrations = usersSnapshot.docs.map(doc => {
      const data = doc.data();
      // Normalize Firestore Timestamps (serializes as {_seconds, _nanoseconds}
      // through res.json()) into ISO strings the frontend can reliably read.
      const toISO = (v) => {
        if (!v) return null;
        if (v instanceof Date) return v.toISOString();
        if (typeof v === 'object' && typeof v.toDate === 'function') return v.toDate().toISOString();
        if (typeof v === 'object' && (v._seconds || v.seconds)) {
          return new Date((v._seconds || v.seconds) * 1000).toISOString();
        }
        return null;
      };
      return {
        ...data,
        id: doc.id,
        createdAt: toISO(data.createdAt) || data.createdAt || null,
      };
    });

    const feedbackSnapshot = await db.collection('feedback').get();
    const feedbacks = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const logsSnapshot = await db.collection('authLogs').orderBy('timestamp', 'desc').limit(100).get();
    const authLogs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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

// Admin auth logs route
router.get('/admin/auth-logs', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized admin access' });
    }

    if (!db) {
      return res.status(500).json({ error: 'Database service unavailable' });
    }

    const logsSnapshot = await db.collection('authLogs').orderBy('timestamp', 'desc').limit(100).get();
    const authLogs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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

    if (decoded.role !== 'user') {
      return res.status(403).json({ error: 'Unauthorized user access' });
    }

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

// Forgot password with rate limiting and user enumeration protection
router.post('/forgot-password', forgotPasswordLimiter, async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      // ─── USER ENUMERATION ATTACK PREVENTION ───
      // Return identical confirmation message even if user does not exist to satisfy OWASP credentials check
      return res.json({ message: 'If an account exists with that email, a password reset link has been sent.' });
    }

    // ─── DYNAMIC SINGLE-USE SECRET SIGNATURE ───
    // Tokens are dynamically signed using process.env.JWT_SECRET + user.password.
    // Once the user's password updates in the DB, user.password updates, immediately
    // invalidating this token signature across all old reset requests!
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET + user.password,
      { expiresIn: '1h' }
    );

    const isLocalhost = req.headers.origin?.includes('localhost');
    const API_BASE_URL = isLocalhost ? "http://localhost:3000" : "https://wecareehs.in";
    const resetLink = `${API_BASE_URL}/reset-password/${resetToken}`;

    const subject = 'Password Reset Request — WeCare EHS';
    const htmlContent = `
      <p>Hello,</p>
      <p>You requested to reset your password for WeCare EHS. Click the link below to reset it:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour and is valid for a single reset attempt.</p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `;
    await sendEmail(email, subject, htmlContent);

    res.json({ message: 'If an account exists with that email, a password reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Reset password with single-use verification and complexity check
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    // 1. Decode token to fetch target user credentials
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.email) {
      return res.status(400).json({ error: 'Invalid reset token format' });
    }

    const user = await getUserByEmail(decoded.email);
    if (!user) {
      return res.status(404).json({ error: 'User no longer exists' });
    }

    // 2. Dynamic Verification: verifies token signature against JWT_SECRET + user's active password
    jwt.verify(token, process.env.JWT_SECRET + user.password);

    // 3. ─── STRONG PASSWORD COMPLEXITY CHECK ───
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password in Firestore and clear brute force lockout indicators
    await db.collection('users').doc(user.id).update({
      password: hashedPassword,
      failedAttempts: 0,
      lockUntil: null
    });

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(400).json({ error: 'This password reset link is invalid or has already been used.' });
  }
});

// Registration route with validation, complexity checking, and rate limiting
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, company, username } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['firstName', 'lastName', 'email', 'password', 'phone']
      });
    }

    // ─── STRONG PASSWORD COMPLEXITY CHECK ───
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
      });
    }

    // Optional unique username (3–20 chars, letters/numbers/underscore)
    const trimmedUsername = username ? String(username).trim() : '';
    if (trimmedUsername) {
      if (!isValidUsername(trimmedUsername)) {
        return res.status(400).json({
          message: 'Username must be 3–20 characters: letters, numbers and underscores, starting with a letter.',
        });
      }
      if (!(await isUsernameAvailable(trimmedUsername, null))) {
        return res.status(409).json({ message: 'This username is already taken.' });
      }
    }

    let user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name: `${firstName} ${lastName}`,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      phone,
      company: company || '',
      username: trimmedUsername,
      usernameLower: trimmedUsername.toLowerCase(),
      pfpUrl: '',
      role: 'user',
      createdAt: new Date(),
      isAdmin: false,
      failedAttempts: 0,
      lockUntil: null
    };

    const docRef = await db.collection('users').add(newUser);

    const token = jwt.sign(
      { userId: docRef.id, email: email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(201).json({
      token,
      user: publicUser({ id: docRef.id, ...newUser }),
    });
  } catch (error) {
    console.error('Registration error:', error);
    // Stripped raw error.message output to avoid CWE-209 database schema information leakages
    res.status(500).json({
      message: 'Server error occurred during registration.'
    });
  }
});

module.exports = router;
