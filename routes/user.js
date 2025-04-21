const express = require("express");
const { handlePostRegister , handlePostOTP,handleGetRegister, handlePostLogin, handleGetOTP, handleGetLogin, handleUpdateProfile, handleGetProfile} = require("../controllers/user");
const authorisedUser = require("../middleware/userAuth")

const router = express.Router();


router.post("/register",handlePostRegister);
router.post("/otp-verify",handlePostOTP);
router.post("/login",handlePostLogin);
router.post("/profile",authorisedUser,handleUpdateProfile);

router.get("/register",handleGetRegister);
router.get("/otp-verify",handleGetOTP);
router.get("/login",handleGetLogin);
router.get("/profile",authorisedUser,handleGetProfile);



module.exports = router;