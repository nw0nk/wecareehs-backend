const jwt = require("jsonwebtoken");
const db = require("../firebase");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from Firestore
    const userSnap = await db.collection("users").doc(decoded.userId).get();
    if (!userSnap.exists) {
      return res.status(401).json({ message: "Invalid token - user not found" });
    }
    const user = userSnap.data();

    req.user = { ...user, id: decoded.userId };
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin-specific middleware (optional, if you use it)
const adminMiddleware = (req, res, next) => {
  if (!req.user?.isAdmin && req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin privileges required" });
  }
  next();
};

module.exports = authMiddleware;