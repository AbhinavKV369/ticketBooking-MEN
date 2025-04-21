const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.MY_SECRET;

const User = require("../model/user");
const { generateOTP, sendOTP } = require("../services/nodeMailer");
const { handleHashValue, handleCompareValue } = require("../services/hashPassword");

async function handlePostRegister(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render("user/login-signup", {
        message: "User already exists",
        activeTab: "signup",
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).render("user/login-signup", {
        message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
        activeTab: "signup",
      });
    }

    const hashedPassword = await handleHashValue(password);
    const otp = generateOTP();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
    });

    await newUser.save();
    await sendOTP(email, otp);

    res.status(200).render("user/otp-verify", {
      email,
      message: "Verify your OTP",
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  }
}

async function handlePostOTP(req, res) {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("user/otp-verify", {
        message: "User not found",
        email
      });
    }

    if (otp !== user.otp || Date.now() > user.otpExpires) {
      return res.status(400).render("user/otp-verify", {
        message: "Invalid OTP or OTP Expired",
        email
      });
    }

    user.isVerified = true;
    user.isBlocked = false;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });

    res.cookie("KL-Easy-Trip", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).render("user/home");
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  }
}

async function handlePostLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("user/login-signup", {
        message: "User not found",
        activeTab: "login",
      });
    }

    const isPasswordMatch = await handleCompareValue(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).render("user/login-signup", {
        message: "Invalid Password",
        activeTab: "login",
      });
    }

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });

    res.cookie("KL-Easy-Trip", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).render("user/home");
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  }
}

async function handleGetProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.redirect("/login");
    }

    res.render("user/profile", {
      user,
      message: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  }
}

async function handleUpdateProfile(req, res) {
  const { name, email, phone } = req.body;

  try {
    const user = req.user.id;
    if (!user) {
      return res.redirect("/login");
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (phone) updatedFields.email = phone;

    const updatedUser = await User.findByIdAndUpdate(user, updatedFields, { new: true });

    if (!updatedUser) {
      return res.status(404).render("user/profile", { message: "User not found", user: req.user });
    }

    res.render("user/profile", {
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  }
}

async function handleGetRegister(req, res) {
  res.render("user/login-signup", {
    message: null,
    activeTab: "signup",
  });
}

async function handleGetOTP(req, res) {
  res.render("user/otp-verify", {
    message: null,
  });
}

async function handleGetLogin(req, res) {
  res.render("user/login-signup", {
    message: null,
    activeTab: "login",
  });
}

async function handleGetProfile(req, res) {
  try {
    const user = await User.findById(req.user.id); 

    if (!user) {
      return res.redirect("/login");
    }

    res.render("user/profile", {
      user, 
      message: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  }
}

async function handleLogout(req,res) {
  res.clearCookie("KL-Easy-Trip");
  res.redirect("/login");
}
  
module.exports = {
  handlePostRegister,
  handlePostOTP,
  handlePostLogin,
  handleUpdateProfile,
  handleGetRegister,
  handleGetOTP,
  handleGetLogin,
  handleGetProfile,
  handleLogout,
};
