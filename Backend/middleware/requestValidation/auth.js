const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.auth = (req, res, next) => {
  try {
    let token;

    // 1️⃣ Try cookie first
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }
    // 2️⃣ Fallback to Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing",
        status: 401,
      });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    // 4️⃣ Attach user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      status: 401,
      error: error,
    });
  }
};
