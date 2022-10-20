const mongoose = require("mongoose")

let Homedynamic = new mongoose.Schema({
    carousel: Array,
    about: Array
})

module.exports = mongoose.model("home-dynamic", Homedynamic)