const mongoose = require("mongoose")

//scheama from product collection
let productScheama = new mongoose.Schema({

    series_name: String,
    product_name: String,
    model_no: String,
    product_description: String,
    images: Array,
    
    //navpills section 
    info: Object,
    pdflink: String,
    news: String,
    youtube: String
})

module.exports = mongoose.model("product", productScheama)


module.exports = mongoose.model("product", productScheama)