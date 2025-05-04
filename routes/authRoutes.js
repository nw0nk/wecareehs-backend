// Add new user dashboard route
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
