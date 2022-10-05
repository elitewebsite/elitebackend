const mongoose = require("mongoose")
//scheama from product collection

let productScheama = new mongoose.Schema({
    name: String,
    series: String,
    description: String,
    info: Array

})

module.exports = mongoose.model("product", productScheama)
