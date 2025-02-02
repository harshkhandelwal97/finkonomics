const jwt = require('jsonwebtoken');
const pool = require('../database/connection');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Fetch the user from the database 
    const userQuery = `SELECT id, email FROM users WHERE id = $1`;
    const { rows } = await pool.query(userQuery, [decoded.id]);

    // Check if user exists
    if (rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;
