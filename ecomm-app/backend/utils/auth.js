const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'someDefaultSecret123';

// Generate a new JWT Token
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

// Verify JWT Token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid/Expired Token');
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
