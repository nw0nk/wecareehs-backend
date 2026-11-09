const xss = require('xss');

/**
 * Recursively sanitize a value:
 * - Strips XSS/HTML from strings
 * - Trims whitespace
 * - Removes null bytes
 * - Recurses into objects and arrays
 */
function sanitizeValue(value) {
  if (typeof value === 'string') {
    // Remove null bytes, then XSS-sanitize, then trim
    return xss(value.replace(/\0/g, '').trim());
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value !== null && typeof value === 'object') {
    const sanitized = {};
    for (const key of Object.keys(value)) {
      sanitized[key] = sanitizeValue(value[key]);
    }
    return sanitized;
  }
  // Numbers, booleans, null — pass through
  return value;
}

/**
 * Express middleware: sanitizes req.body, req.query, and req.params
 * to neutralize XSS, null-byte injection, and HTML injection.
 */
const sanitizeInputs = (req, res, next) => {
  if (req.body) {
    // Profile-photo data URLs (base64) must pass byte-exact through the XSS
    // sanitizer — the profile route validates their format + size instead.
    const rawPfp = typeof req.body.pfpUrl === 'string' ? req.body.pfpUrl : undefined;
    req.body = sanitizeValue(req.body);
    if (rawPfp !== undefined) {
      req.body.pfpUrl = rawPfp.replace(/\0/g, '').trim();
    }
  }
  if (req.query) {
    req.query = sanitizeValue(req.query);
  }
  if (req.params) {
    req.params = sanitizeValue(req.params);
  }
  next();
};

module.exports = sanitizeInputs;
