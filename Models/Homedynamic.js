// Schema for dynamic home and about page (old code)
const mongoose = require("mongoose")

let Homedynamic = new mongoose.Schema({
    carousel: Array,
    about: Array
})

module.exports = mongoose.model("home-dynamic", Homedynamic)