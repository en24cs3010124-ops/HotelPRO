const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "hotelpro_super_secret_jwt_key_2026";

const fetchUser = (req, res, next) => {
  // Get token from header: "auth-token", "x-auth-token", or "Authorization: Bearer <token>"
  let token = req.header("auth-token") || req.header("x-auth-token");
  
  const authHeader = req.header("authorization") || req.header("Authorization");
  if (!token && authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

const verifyAdmin = (req, res, next) => {
  fetchUser(req, res, () => {
    if (req.user && (req.user.userType === "Admin" || req.user.role === "admin")) {
      next();
    } else {
      res.status(403).json({ success: false, message: "Access forbidden. Admin role required." });
    }
  });
};

module.exports = { fetchUser, verifyAdmin };
