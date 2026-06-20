const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

require('dotenv').config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token is required"
      });
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    // User info from Google
    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const email = payload.email;
    const fullName = payload.name;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not found from Google"
      });
    }

    // Split full name into name + surname
    const nameParts = fullName ? fullName.trim().split(" ") : [];
    const name = nameParts[0] || "";
    const surname = nameParts.slice(1).join(" ") || "";

    let user = await User.findOne({ email });

    if (user) {
      if (user.provider === "local") {
        return res.status(409).json({
          success: false,
          message: "Please login using email and password"
        });
      }
    } else {
      user = await User.create({
        name,
        surname,
        email,
        password: null,
        provider: "google",
        isVerified: true,
        googleId
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: accessToken,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Google auth error:", error);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed"
    });
  }
};

module.exports = { googleAuth };
