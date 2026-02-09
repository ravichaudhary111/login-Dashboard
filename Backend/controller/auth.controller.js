const { loginUser, rToken, logout } = require("../service/auth.service");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const userAgent = req.headers["user-agent"];

    const deviceType = /mobile/i.test(userAgent) ? "mobile" : "web";

    const { accessToken, refreshToken } = await loginUser(email, password, {
      ipAddress,
      deviceType,
      userAgent,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, //15 min
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxage: 15 * 24 * 60 * 60 * 1000, //15 day
    });

    return res.status(200).json({
      message: "User login successfully",
      status: 200,
      token: accessToken,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
      status: error.statusCode || 500,
    });
  }
};

exports.rToken = async (req, res) => {
  try {
  // Accept refresh token from body or cookie
  const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;
  const accessToken = await rToken(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, //15 min
    });

    return res.status(200).json({
      message: "Token refresh successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
      status: error.statusCode || 500,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
  const refreshToken = req.cookies?.refreshToken;

  await logout(refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).send({
      message: "Logout successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
      status: error.statusCode || 500,
    });
  }
};
