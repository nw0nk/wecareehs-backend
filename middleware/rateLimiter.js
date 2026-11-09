const rateLimit = require('express-rate-limit');

/**
 * Auth rate limiter — strict.
 * Applies to: /api/auth/login, /api/auth/register, /api/admin/login
 * Allows 10 requests per 15 minutes per IP.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many authentication attempts. Please try again after 15 minutes.'
  },
  skipSuccessfulRequests: false,
});

/**
 * Forgot-password rate limiter — very strict.
 * Allows 5 requests per hour per IP.
 */
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many password reset requests. Please try again after 1 hour.'
  },
});

/**
 * Feedback rate limiter — prevents spam.
 * Allows 5 submissions per hour per IP.
 */
const feedbackLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many feedback submissions. Please try again after 1 hour.'
  },
});

/**
 * General API rate limiter.
 * Allows 100 requests per 15 minutes per IP.
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please try again later.'
  },
});

module.exports = { authLimiter, forgotPasswordLimiter, feedbackLimiter, generalLimiter };
