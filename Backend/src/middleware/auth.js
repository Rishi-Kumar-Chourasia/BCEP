const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 1. Set userId (for auth.controller.js compatibility)
    req.userId = decoded.userId;

    // 2. Fetch full user (for role.js compatibility)
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // 3. Attach user to request (Safely convert ID to string)
    req.user = {
      id: user._id.toString(), // Crucial: Convert ObjectId to String
      role: user.role,
      name: user.name,
      email: user.email
    };

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ msg: "Invalid Token" });
  }
};