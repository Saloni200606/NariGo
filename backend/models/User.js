const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  village: { type: String },
  district: { type: String },
  preferredLanguage: { type: String, default: 'hi' },
  role: { type: String, enum: ['woman', 'employer'], default: 'woman' },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
