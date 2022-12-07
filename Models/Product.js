const mongoose = require("mongoose")

//scheama from product collection
let productScheama = new mongoose.Schema({
    sequence_no: {
        type: Number,
        default: 10
    },
    series_name: String,
    product_name: String,
    model_no: String,
    product_description: String,
    images: Array,
    //navpills section 
    info: Object,
    pdflink: Array,
    news: String,
    youtube: Array
})

module.exports = mongoose.model("product", productScheama)


module.exports = mongoose.model("product", productScheama)