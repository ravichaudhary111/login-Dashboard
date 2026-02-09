const refreshToken = require("../model/refreshToken");
const User = require("../model/user.model");
const AppError = require("../utils/appError");

exports.createUser = async (userData) => {
  try {
    console.log(userData)
    return await User.create(userData);
  } catch (error) {
    throw new AppError(error || "Failed to create user", 500);
  }
};

exports.getUserData = async (id) => {
  try {
    const userData = await User.find({ _id: id });
    return userData;
  } catch (error) {
    throw new AppError(error, 500);
  }
};
