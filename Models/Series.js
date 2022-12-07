const mongoose = require("mongoose")
//scheama for series
let categoryScheama = new mongoose.Schema({
    sequence_no: {
        type: Number,
        default: 10
    },
    mainlight: String,
    series: String,
    url: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]

})
module.exports = mongoose.model("category", categoryScheama)