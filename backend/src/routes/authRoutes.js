const express = require("express");
const argon = require("argon2");
const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// register new user
router.post("/registerUser", async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    const emailExists = await Users.findOne({ email });

    if (!name || !surname || !email || !password)
      return res.status(400).json({ message: "Required all fields" });

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
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
      isVerified: "false",
    });


    res.status(201).json({ message: "User created sucessfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// login user
router.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const isMatch = await argon.verify(user.password,password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    if (!user.isVerified) return res.status(400).json({message:"Please verify the email to login"})

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const accessToken = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:"15m"
    })

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken : accessToken,
      refreshToken : refreshToken
    });

    res.status(200).json({
      message: "logged in successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});


// logout User
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

module.exports = router;
