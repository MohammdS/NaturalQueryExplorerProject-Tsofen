// middleware/userMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

// Protect middleware — verifies token and adds user to req
async function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1. Check token exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Decode the JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Lookup user in DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid user' });
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = { protect };
