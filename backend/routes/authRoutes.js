const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const sendOtp = require("../utils/sendOtp");

const router = express.Router();

const otpStore = {};

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "User Registered Successfully",
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      user,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    try {
      await sendOtp(email, otp);

      res.status(200).json({
        message: "OTP sent to your registered email",
        requiresOtp: true,
        email,
      });
    } catch (error) {
      console.log("OTP EMAIL ERROR:", error.message);

      res.status(500).json({
        message: "Failed to send OTP email",
      });
    }
  });
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const storedOtp = otpStore[email];

  if (!storedOtp) {
    return res.status(400).json({
      message: "OTP not found. Please login again.",
    });
  }

  if (Date.now() > storedOtp.expiresAt) {
    delete otpStore[email];

    return res.status(400).json({
      message: "OTP expired. Please login again.",
    });
  }

  if (storedOtp.otp !== otp) {
    return res.status(401).json({
      message: "Invalid OTP",
    });
  }

  const user = storedOtp.user;

  const token = jwt.sign(
    {
      id: user.user_id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  delete otpStore[email];

  res.status(200).json({
    message: "Login Successful",
    token,
    user: {
      id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = router;