//scheama for series
const mongoose = require("mongoose")
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