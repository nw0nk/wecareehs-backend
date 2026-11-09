const { body, validationResult } = require('express-validator');

/**
 * Middleware: collect validation errors and return 400 if any exist.
 * Always place this AFTER the validation chain middleware.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return only the first error message (avoid leaking field info)
    const firstError = errors.array()[0];
    return res.status(400).json({ error: firstError.msg });
  }
  next();
};

/**
 * Validation chain for user registration.
 * Enforces strong password policy and clean input.
 */
const validateRegister = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required.')
    .isLength({ max: 50 }).withMessage('First name must be 50 characters or less.')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('First name contains invalid characters.'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required.')
    .isLength({ max: 50 }).withMessage('Last name must be 50 characters or less.')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Last name contains invalid characters.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.')
    .isLength({ max: 254 }).withMessage('Email is too long.'),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
    .isLength({ max: 128 }).withMessage('Password must be 128 characters or less.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[0-9]/).withMessage('Password must contain at least one number.')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character.'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required.')
    .matches(/^[\d\s\+\-\(\)]{7,20}$/).withMessage('Invalid phone number format.'),

  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Company name must be 100 characters or less.'),

  handleValidationErrors,
];

/**
 * Validation chain for user login.
 */
const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.'),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ max: 128 }).withMessage('Invalid credentials.'),

  handleValidationErrors,
];

/**
 * Validation chain for forgot password.
 */
const validateForgotPassword = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.'),

  handleValidationErrors,
];

/**
 * Validation chain for reset password.
 */
const validateResetPassword = [
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
    .isLength({ max: 128 }).withMessage('Password is too long.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[0-9]/).withMessage('Password must contain at least one number.')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character.'),

  handleValidationErrors,
];

/**
 * Validation chain for feedback submission.
 */
const validateFeedback = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name is too long.'),

  body('comment')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Comment must be 1000 characters or less.'),

  body('trainingTitle')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Training title is too long.'),

  body('overall')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('Overall rating must be between 1 and 5.'),

  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateFeedback,
  handleValidationErrors,
};
