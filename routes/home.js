const express = require("express");
const router = express.Router();

const { handleGetHome, handleGetBuses, handleGetAbout, handleGetContact } = require("../controllers/home");

router.get("/",handleGetHome);
router.get("/search-buses",handleGetBuses);
router.get("/about",handleGetAbout);
router.get("/contact",handleGetContact);

module.exports = router;
