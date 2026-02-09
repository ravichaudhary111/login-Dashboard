const {createUser, getUserData}= require("../service/user.service");
const AppError = require("../utils/appError");

exports.createUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    return res.status(201).json({
      message: "User created successfully",
      status: 201,
      data: user,
    });
  } catch (error) {
    console.error("error------>",error);

    return res.status(500).json({
      message: "Failed to create user",
      status: 500,
      error: error.message,
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const id=req.params.id;
    const userData = await getUserData(id);
    return res.status(200).json({
      message: "ok",
      status: 200,
      data: userData,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
      status: error.statusCode || 500,
    });
  }
};
