const { Resend } = require("resend");
const argon = require("argon2");
const Users = require("../../models/userModel");
const redis = require("../../config/redis");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API);

const sendOTP = async (email, verificationId) => {
  try {
    // Daily limit check
    const dailyCount =
      Number(await redis.get(`otp-daily-limit:${verificationId}`)) || 0;

    if (dailyCount >= 10) {
      return {
        success: false,
        message: "OTP daily limit exceeded",
      };
    }

    // Cooldown check
    const existingOTP = await redis.get(`otp:${verificationId}`);
    if (existingOTP) {
      const ttl = await redis.ttl(`otp:${verificationId}`);

      if (ttl > 480) {
        return {
          success: false,
          message: `Try again after ${ttl - 480}s`,
        };
      }
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOTP = await argon.hash(otp.toString());

    // Send email first
    const { error } = await resend.emails.send({
      from: "Insightflow <otp@sahilsawant.tech>",
      to: email,
      subject: "OTP for Insightflow Email Verification",
      html: `
        <p>Please verify your email.</p>
        <p><strong>OTP:</strong> ${otp}</p>
      `,
    });

    if (error) {
      return {
        success: false,
        message: "Failed to send OTP",
      };
    }

    // Store OTP only after successful email
    await redis.setEx(`otp:${verificationId}`, 600, hashedOTP);

    const count = await redis.incr(`otp-daily-limit:${verificationId}`);
    if (count === 1) {
      await redis.expire(`otp-daily-limit:${verificationId}`, 86400);
    }

    return {
      success: true,
      message: "OTP sent successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const verifyOTP = async (verificationId, otp) => {
  try {
    const user = await Users.findById(verificationId);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const hashedOTP = await redis.get(`otp:${verificationId}`);

    if (!hashedOTP) {
      return {
        success: false,
        message: "OTP expired",
      };
    }

    const isOTPValid = await argon.verify(
      hashedOTP,
      otp.toString()
    );

    if (!isOTPValid) {
      return {
        success: false,
        message: "Invalid OTP",
      };
    }

    await Users.findByIdAndUpdate(verificationId, {
      isVerified: true,
    });

    await redis.del(`otp:${verificationId}`);

    return {
      success: true,
      message: "Email verified successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

module.exports = { sendOTP, verifyOTP };
