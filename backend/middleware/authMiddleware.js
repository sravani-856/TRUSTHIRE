const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

if (!authHeader) {
  return res.status(401).json({
    message: "Access Denied. No Token Provided",
  });
}

const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No Token Provided",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Forbidden",
      });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  authorizeRoles,
};