const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

exports.generateAccessToken = (user) => {
  try {
    return jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
    );
  } catch {
    throw new AppError("Access token generation failed", 500);
  }
};

exports.generateRefreshToken = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "15d",
    });
  } catch {
    throw new AppError("Refresh token generation failed", 500);
  }
};