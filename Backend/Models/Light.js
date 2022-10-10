const mongoose = require("mongoose")
let light = new mongoose.Schema({
    name: String,
})

module.exports = mongoose.model("light-category", light)