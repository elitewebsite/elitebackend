// Schema for about us page
const mongoose = require("mongoose")
let aboutcollection = new mongoose.Schema({
    about: Array,

})
module.exports = mongoose.model("about", aboutcollection)