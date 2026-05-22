const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Authorization header should look like: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ use your secret
    req.user = decoded; // attach decoded payload (e.g., userId, email) to req
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
