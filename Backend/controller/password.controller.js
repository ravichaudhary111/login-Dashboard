const passwordService = require("../service/password.service");


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const resetToken = await passwordService.forgotPassword(email);

    const resetLink = `https://yourapp.com/reset-password/${resetToken}`;

    // 📩 EMAIL SERVICE GOES HERE
    // sendEmail(user.email, resetLink);

    // 📱 SMS SERVICE GOES HERE 👇
    // sendSMS(user.mobile, `Reset your password: ${resetLink}`);

    return res.status(200).json({
      message: "Password reset link sent successfully"
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Forgot password failed"
    });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    await passwordService.resetPassword(token, password);

    return res.status(200).json({
      message: "Password reset successfully"
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Reset password failed"
    });
  }
};
