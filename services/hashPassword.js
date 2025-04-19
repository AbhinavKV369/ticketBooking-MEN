const bcrypt = require("bcryptjs");

async function handleHashValue(value) {
   return bcrypt.hash(value + process.env.my_secret ,10);
}

async function handleCompareValue(plain,hashed) {
   return bcrypt.compare(plain + process.env.my_secret ,hashed);
}

module.exports = {
    handleHashValue,
    handleCompareValue,
}