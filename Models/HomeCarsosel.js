// Schema for changing home page carousel imgs and title
const mongoose = require("mongoose")
let carosale = new mongoose.Schema({
    info: Array,

})
module.exports = mongoose.model("homecarosel", carosale)