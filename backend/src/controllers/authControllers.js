const argon = require("argon2");
const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const redis = require('../config/redis')
const { sendOTP } = require("../utils/emailVerification/email");

require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required all fields",
      });
    }

    const emailExists = await Users.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await argon.hash(password, {
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });

    const user = await Users.insertOne({
      name,
      surname,
      email,
      password: hashedPassword,
      provider: "local",
      isVerified: false,
    });

    const verificationId = user._id.toString();

    const sentOTP = await sendOTP(email, verificationId);

    if (!sentOTP.success) {
      return res.status(400).json(sentOTP);
    }

    return res.status(201).json({
      success: true,
      verificationId,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const wrongLoginCount =
      Number(await redis.get(`wrongLogin:${email}`)) || 0;

    if (wrongLoginCount >= 30) {
      const ttl = await redis.ttl(`wrongLogin:${email}`);

      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Try after ${ttl} seconds`,
      });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    const isMatch = await argon.verify(user.password, password);

    if (!isMatch) {
      const count = await redis.incr(`wrongLogin:${email}`);

      if (count === 1) {
        await redis.expire(`wrongLogin:${email}`, 1800);
      }

      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    await redis.del(`wrongLogin:${email}`);

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify email to login",
      });
    }

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
