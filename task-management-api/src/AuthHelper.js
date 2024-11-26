const jwt = require('jsonwebtoken');
require("dotenv").config()
// Middleware to verify JWT and extract user ID
const authenticateToken = (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization) {
    return res.status(401).send({ status: 'ERR', message: 'No token provided' });
  }
  const token = authorization.replace("Bearer ","")
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req._id = decoded._id; // Attach user ID to the request object
    next();
  } catch (error) {
    return res.status(401).send({ status: 'ERR', message: 'Unauthorized access' });
  }
};

module.exports = authenticateToken;