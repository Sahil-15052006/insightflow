const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authControllers");
const { verifyUserOTP, sendUserOTP, resetPassword } = require("../controllers/otpControllers");
const { verifyRefreshToken } = require("../middleware/authMiddleware");
const { googleAuth } = require('../controllers/gauthController')

require("dotenv").config();

const router = express.Router();

router.post("/registerUser",registerUser);
router.post("/loginUser", loginUser);
router.post("/logout", logoutUser);
router.post("/googleAuth",googleAuth)

router.patch("/verifyUserOTP", verifyUserOTP);
router.post("/sendUserOTP",sendUserOTP)
router.patch("/resetPassword",resetPassword)

router.post("/refresh-token", verifyRefreshToken, (req, res) => {
  const newAccessToken = jwt.sign(
    { id: req.user.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  return res.status(200).json({
    success: true,
    accessToken: newAccessToken,
  });
});

module.exports = router;
