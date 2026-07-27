const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, village, district, preferredLanguage, role } = req.body;

    // Check if user exists
    let existingUser = await User.findOne({ phoneNumber });
    if (existingUser) return res.status(400).json({ message: 'User with this phone number already exists' });
    
    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newUser = new User({
      fullName, phoneNumber, email, password: hashedPassword,
      village, district, preferredLanguage, role,
      otp, otpExpires
    });

    await newUser.save();

    console.log(`\n\n=== NariGo OTP for ${phoneNumber} ===\n${otp}\n====================================\n\n`);

    res.status(201).json({ message: 'User registered successfully. OTP sent.', phoneNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { identifier, otp } = req.body; // identifier can be phone or email

    const user = await User.findOne({ 
      $or: [{ phoneNumber: identifier }, { email: identifier }]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    
    if (new Date() > user.otpExpires) return res.status(400).json({ message: 'OTP has expired' });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: 'Account verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during verification' });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { identifier } = req.body;
    const user = await User.findOne({ 
      $or: [{ phoneNumber: identifier }, { email: identifier }]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    console.log(`\n\n=== NariGo NEW OTP for ${identifier} ===\n${otp}\n====================================\n\n`);

    res.json({ message: 'OTP resent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during resend' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    
    const user = await User.findOne({ 
      $or: [{ phoneNumber: identifier }, { email: identifier }]
    });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your account first', unverified: true });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET || 'supersecretnarigokey2026', 
      { expiresIn: '7d' }
    );

    res.json({ 
      message: 'Login successful',
      token,
      user: { id: user._id, fullName: user.fullName, phoneNumber: user.phoneNumber, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Forgot Password -> Send OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { identifier } = req.body;
    const user = await User.findOne({ 
      $or: [{ phoneNumber: identifier }, { email: identifier }]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    console.log(`\n\n=== NariGo PASSWORD RESET OTP for ${identifier} ===\n${otp}\n====================================\n\n`);

    res.json({ message: 'Password reset OTP sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during forgot password' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { identifier, otp, newPassword } = req.body;
    
    const user = await User.findOne({ 
      $or: [{ phoneNumber: identifier }, { email: identifier }]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (new Date() > user.otpExpires) return res.status(400).json({ message: 'OTP has expired' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    // Clear OTP
    user.otp = undefined;
    user.otpExpires = undefined;
    
    // Auto verify if they weren't already
    user.isVerified = true;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during reset password' });
  }
});

module.exports = router;
