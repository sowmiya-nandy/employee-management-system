const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  const token = authHeader.split(" ")[1];

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({
      message: "Token Missing",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Verified User:", verified);

    req.user = verified;

    next();
  } catch (err) {
    console.log("JWT Error:", err.message);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;