const mongoose = require("mongoose")
let formSheama = new mongoose.Schema({
    name: String,
    email: String,
    message: String

})
module.exports = mongoose.model("formdetails", formSheama)