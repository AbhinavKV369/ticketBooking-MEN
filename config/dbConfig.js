const mongoose = require("mongoose");

async function dbConfig(url) {
    mongoose.connect(url)
    .then(()=> console.log("MongoDB connected successfully"))
    .catch(()=> console.log("Error while connecting mongoDB")) 
}

module.exports = dbConfig;