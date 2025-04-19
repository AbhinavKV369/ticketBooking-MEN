const jwt = require("jsonwebtoken");

const User = require("../model/user");
const { generateOTP, sendOTP } = require("../services/nodeMailer");
const { handleHashValue } = require("../services/hashPassword");

async function handlePostSignup(req,res) {
    const {name,email,password} = req.body
    try{
        const existingUser = await User.find({email});
        if(existingUser) return res.status(400).render("user/signup-login",{
            message: "User already exists"
        });

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if(!passwordRegex.test(password)) return res.status(400).render("user/signup-login",{
            message: "Your password not strong enough"
        });

      const hashedPassword = await handleHashValue(password);
      
      const otp = generateOTP()

      const newUser = new User({
        name,
        email,
        password:hashedPassword,
        otp,
        otpExpires: Date.now() + 5 * 60 * 1000,
      });

      await newUser.save();
      await sendOTP(email,otp);

      res.status(200).render("verify-otp",{
        email,
        message: "Verify your OTP"
      });
      
    }catch(error){
        res.status(500).render("server-error",{
            message: "Internal Server Error"
        })
    }
}