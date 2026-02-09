const crypto = require("crypto");
const User = require("../model/user.model");
const RefreshToken = require("../model/refreshToken");
const AppError = require("../utils/appError");

/**
 * FORGOT PASSWORD
 */
exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // generate raw reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // hash token before saving
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

  await user.save();

  // 🔔 RETURN RAW TOKEN
  // 👉 Controller will send this via EMAIL or SMS
  return resetToken;
};

/**
 * RESET PASSWORD
 */
exports.resetPassword = async (token, newPassword) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new AppError("Invalid or expired reset token", 400);
  }

  // update password (hashed by pre-save hook)
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  // 🔒 LOGOUT FROM ALL DEVICES (recommended)
  await RefreshToken.deleteMany({ userId: user._id });

  return true;
};
