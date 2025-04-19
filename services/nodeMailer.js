const nodemailer = require('nodemailer');
const crypto = require("crypto");
require("dotenv").config();

function generateOTP(){
   return crypto.randomInt(100000,999999).toString();
}

async function sendOTP(email,otp){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.my_email,
            pass: process.env.my_password
        }
    });

    await transporter.sendMail({
        from:process.env.my_email,
        to: email,
        subject: "Your KL-Trip Easy OTP code",
        html: `<h1>Welcome to KL-Trip Easy</h1> 
        <p style="background:"green" color:white">>Your OTP code is ${otp}</p>
        <p style="color:red">Dont share this code to anyone</p>`
    })
}

module.exports = {
    generateOTP,
    sendOTP,
}
