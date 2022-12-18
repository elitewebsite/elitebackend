// Schama for Featured Products
const mongoose = require("mongoose")
let featured = new mongoose.Schema({
    name:String,
    image:Object
})
module.exports = mongoose.model("featured-products", featured)