const mongoose = require("mongoose")
const gallerySceame = new mongoose.Schema({
    eventName: String,
    image: Object
})

module.exports = mongoose.model("dynamicgallery", gallerySceame)