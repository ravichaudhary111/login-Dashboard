const express = require("express");
const router = express.Router();

const {createUser,getUserData} = require("../controller/user.controller");
const { auth } = require("../middleware/requestValidation/auth");
const { validate } = require("../middleware/requestValidation/validate");
const { registerSchema } = require("../middleware/requestValidation/schemas");

router.post("/", validate(registerSchema, 'body'), createUser);
router.get("/:id", auth, getUserData);

module.exports = router;

