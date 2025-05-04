const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
require("dotenv").config();

const app = express();

// Enable CORS for your frontend domain
app.use(cors({ 
  origin: "https://www.wecareehs.in", // Replace with your domain
  credentials: true 
}));

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);

// Remove the code below (no static file serving)
// app.use(express.static(path.join(__dirname, '../public_html')));
// app.get('*', (req, res) => { ... });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
