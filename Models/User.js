const mongoose = require("mongoose")
let userSheama = new mongoose.Schema({
    email: String,
    password: String

})

module.exports = mongoose.model("user", userSheama)