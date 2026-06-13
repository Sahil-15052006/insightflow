const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authControllers");
const { verifyUserOTP, sendUserOTP, resetPassword } = require("../controllers/otpControllers");

require("dotenv").config();

const router = express.Router();

router.post("/registerUser",registerUser);
router.post("/loginUser", loginUser);
router.post("/logout", logoutUser);

router.patch("/verifyUserOTP", verifyUserOTP);
router.post("/sendUserOTP",sendUserOTP)
router.patch("/resetPassword",resetPassword)

module.exports = router;
