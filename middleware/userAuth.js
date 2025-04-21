const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.my_secret;

async function authenticateUser(req, res, next) {
  const token = req.cookies["KL-Easy-Trip"];

  try {
    if (!token) {
      return res.status(401).render("user/login-signup", {
        message: "Unauthorized user, please login",
        activeTab: "login"
      });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded.user; 

    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);

    return res.status(401).render("user/login-signup", {
      message: "Invalid or expired token. Please login again.",
      activeTab: "login"
    });
  }
}

module.exports = authenticateUser;
