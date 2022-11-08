const mongoose = require("mongoose")
//scheama for series
let categoryScheama = new mongoose.Schema({
    mainlight: String,
    series: String,
    url: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]

})
module.exports = mongoose.model("category", categoryScheama)