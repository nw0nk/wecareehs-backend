const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const sanitizeInputs = require("./middleware/sanitize");
const { generalLimiter } = require("./middleware/rateLimiter");
require("dotenv").config();

const app = express();

// ─── 1. SECURITY HEADERS (Helmet) ──────────────────────────────────────────
// Sets X-Frame-Options, X-Content-Type-Options, HSTS, and 12+ other headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://wecareehs-backend.onrender.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
}));

// ─── 2. CORS — Strict Allowlist ─────────────────────────────────────────────
// Only allow requests from our known frontend origins
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman in dev) only in development
    if (!origin) {
      if (process.env.NODE_ENV === "production") {
        return callback(new Error("CORS: requests without origin are not allowed in production."), false);
      }
      return callback(null, true);
    }
    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: origin '${origin}' is not allowed.`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
}));

// ─── 3. BODY PARSING — with size limit to prevent large payload attacks ─────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ─── 4. INPUT SANITIZATION ─────────────────────────────────────────────────
// Sanitize all request inputs to strip XSS, null bytes, and HTML injection
app.use(sanitizeInputs);

// ─── 5. GENERAL RATE LIMITING ──────────────────────────────────────────────
// 100 requests per 15 minutes per IP — tighter limits set on specific routes
app.use(generalLimiter);

// ─── 6. REQUEST LOGGING ────────────────────────────────────────────────────
// 'combined' format in production, 'dev' in development
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// ─── 7. API ROUTES ─────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/analytics", analyticsRoutes);

// ─── 8. 404 HANDLER ────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found." });
});

// ─── 9. GLOBAL ERROR HANDLER ───────────────────────────────────────────────
// Catches errors thrown from middleware/routes and never leaks stack traces
app.use((err, req, res, next) => {
  // CORS error
  if (err.message && err.message.startsWith("CORS:")) {
    return res.status(403).json({ error: err.message });
  }
  // Generic server error — never expose internal details in production
  console.error("Unhandled error:", err);
  const statusCode = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === "production"
    ? "An internal server error occurred."
    : err.message;
  res.status(statusCode).json({ error: message });
});

// ─── 10. START SERVER ──────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});
