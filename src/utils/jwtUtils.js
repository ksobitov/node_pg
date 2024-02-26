const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a user.
 * @param {Object} user - The user object.
 * @returns {String} The generated JWT token.
 */
const generateToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_KEY, { expiresIn: '24h' });
};

/**
 * Verify a JWT token.
 * @param {String} token - The token to verify.
 * @returns {Object} The decoded token if valid, or null if invalid.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };