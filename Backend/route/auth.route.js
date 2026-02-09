const express = require("express");
const router = express.Router();

const authController = require("../controller/auth.controller");
const passwordController = require("../controller/password.controller");
const { validate } = require("../middleware/requestValidation/validate");
const { loginSchema } = require("../middleware/requestValidation/schemas");

router.post("/login", validate(loginSchema, 'body'), authController.loginUser);
router.post("/refresh", authController.rToken);
router.post("/logout", authController.logoutUser);

router.post("/forgot-password", passwordController.forgotPassword);
router.post("/reset-password/:token", passwordController.resetPassword);


module.exports = router;
