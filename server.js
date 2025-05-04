const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
require("dotenv").config();

const app = express();

// Path to the React build output (adjust if needed)
const publicDir = path.join(__dirname, '../build');

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);

// Serve static files from React build
app.use(express.static(publicDir));

// Catch-all: serve React app for any other route (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
