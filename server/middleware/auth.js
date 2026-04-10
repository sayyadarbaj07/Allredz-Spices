const jwt = require("jsonwebtoken");

// Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, isAdmin }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Verify Token + Admin
const isAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else res.status(403).json({ message: "Admin only" });
  });
};

// Verify Token + User (optional, for user routes)
const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else res.status(403).json({ message: "Not allowed" });
  });
};

module.exports = { verifyToken, verifyTokenAndUser, isAdmin };
