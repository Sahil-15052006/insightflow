const express = require("express");
const argon = require("argon2");
const Users = require("../models/userModel");
const crypto = require("crypto");
const { sendOTP, verifyOTP } = require("../utils/emailVerification/email");
const { setHeapSnapshotNearHeapLimit } = require("v8");
require("dotenv").config();

const verifyUserOTP = async (req, res) => {
  try {
    const { verificationId, otp } = req.body;
    const verificationStatus = await verifyOTP(verificationId, otp);
    res.status(200).json({
      success: verificationStatus,
    });
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};

const sendUserOTP = async (req, res) => {
  try {

    const { email } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) return res.json({ message: "Email not resgistered" });
    const verificationId = user.verificationId;
    const sentOTP = await sendOTP(email, verificationId);
    if (sentOTP){
      return res.status(200).json({
        success: true,
        verificationId: verificationId,
        message: "OTP sent on email",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { otp, verificationId, newPassword } = req.body;
    const isOTPvalid = await verifyOTP(verificationId,otp);
    if (isOTPvalid) {
      const hashedPassword = await argon.hash(newPassword, {
        memoryCost: 60000,
        timeCost: 3,
        parallelism: 4,
      });
      const user = await Users.findOneAndUpdate(
        { verificationId: verificationId },
        { password: hashedPassword },
        {
          returnDocument:'after'
        }
      );
      res.status(200).json({
        success: true,
        message: "Password changed sucessfully",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports = {
  verifyUserOTP,
  sendUserOTP,
  resetPassword,
};
