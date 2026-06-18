const argon = require("argon2");
const Users = require("../models/userModel");
const { sendOTP, verifyOTP } = require("../utils/emailVerification/email");

require("dotenv").config();

const verifyUserOTP = async (req, res) => {
  try {
    const { verificationId, otp } = req.body;

    const verificationStatus = await verifyOTP(verificationId, otp);

    return res.status(verificationStatus.success ? 200 : 400).json(
      verificationStatus
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const sendUserOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    const verificationId = user._id.toString();
    const sentOTP = await sendOTP(email, verificationId);

    if (!sentOTP.success) {
      return res.status(400).json(sentOTP);
    }

    return res.status(200).json({
      success: true,
      verificationId,
      message: "OTP sent on email",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { otp, verificationId, newPassword } = req.body;

    const otpStatus = await verifyOTP(verificationId, otp);

    if (!otpStatus.success) {
      return res.status(400).json(otpStatus);
    }

    const hashedPassword = await argon.hash(newPassword, {
      memoryCost: 60000,
      timeCost: 3,
      parallelism: 4,
    });

    await Users.findOneAndUpdate(
      { _id: verificationId },
      { password: hashedPassword },
      { returnDocument: "after" }
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  verifyUserOTP,
  sendUserOTP,
  resetPassword,
};
