const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const flash = require("connect-flash");
require("dotenv").config();

const dbConfig = require("./config/dbConfig");

const userRoutes = require("./routes/user");
const homeRoutes = require("./routes/home")


PORT = process.env.PORT ;
dbConfig(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.resolve("public")));

app.use("/",userRoutes,homeRoutes);


app.set("view engine","ejs");
app.set("views",path.resolve("views"));

app.listen(PORT,()=>{
    console.log(`Server connected at PORT ${PORT}`)
})
