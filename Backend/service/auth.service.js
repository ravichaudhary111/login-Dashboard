const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenGenerator");

const User = require("../model/user.model");
const RefreshToken = require("../model/refreshToken");

exports.loginUser = async (email, password, meta) => {
  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      throw new AppError("User does not exist. Please create an account", 404);
    }

    const isCorrectUser = await bcrypt.compare(password, userData.password);
    if (!isCorrectUser) {
      throw new AppError("Password is incorrect", 401);
    }

    // ✅ access token (short-lived)
    const accessToken = generateAccessToken(userData);

    // ✅ refresh token (long-lived)
    const refreshToken = generateRefreshToken(userData._id);

    const res = await RefreshToken.create({
      userId: userData._id,
      token: refreshToken,
      ipAddress: meta.ipAddress,
      deviceType: meta.deviceType,
      userAgent: meta.userAgent,
    });
    return { accessToken, refreshToken };
  } catch (err) {
    // ✅ preserve original AppError
    if (err instanceof AppError) throw err;

    throw new AppError(err.message || "Login failed", 500);
  }
};

exports.rToken = async (refreshToken) => {
  try {
    const tokenData = await RefreshToken.find({ token: refreshToken }).populate(
      "userId",
    );

    if (!tokenData) {
      throw new AppError("Refresh token is expired or wrong", 401);
    }
    const userData = tokenData.userId;
    const token = generateAccessToken(userData);
    return token;
  } catch (error) {
    console.log("errror", error);
    if (error instanceof AppError) return error;
    throw new AppError("Reresh token failed", 500);
  }
};

exports.logout = async (refreshToken) => {
  try {
    await RefreshToken.deleteOne({ token: refreshToken });
  } catch (error) {
    if (error instanceof AppError) return error;
    throw new AppError("Logout failed", 500);
  }
};
