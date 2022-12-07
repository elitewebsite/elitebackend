const mongoose = require("mongoose")
let carosale = new mongoose.Schema({
    info: Array,

})
module.exports = mongoose.model("homecarosel", carosale)