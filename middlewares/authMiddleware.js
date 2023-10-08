const jwt = require('jsonwebtoken');

const authMiddleware = {};
authMiddleware.authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Token missing.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
