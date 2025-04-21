const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
   phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default:false
  },
  isBlocked: {
    type: Boolean,
    default:true
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
