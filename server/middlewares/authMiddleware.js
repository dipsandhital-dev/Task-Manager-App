const jwt = require("jsonwebtoken");
const User = require('../models/User');


// Middleware to protect the route
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Check for Bearer token
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // Extract token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    }

    return res.status(401).json({ message: "No token provided" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token failed", error: error.message });
  }
};
0
// Admin-only access middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access Denied, Admin only" });
};

module.exports = { protect, adminOnly };
