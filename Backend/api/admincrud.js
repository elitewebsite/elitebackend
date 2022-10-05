const mongoose = require("mongoose")
//const connection = process.env.connection
const express = require("express")
const router = express.Router();

const Category = require("../Models/Series")
const Product = require("../Models/Product")

const connection = "mongodb+srv://Muchmark:mLlrGljRs180tAAS@cluster0.irij3nk.mongodb.net/Elite?retryWrites=true&w=majority"

mongoose.connect(connection).then((res) => {


}).catch((err) => {
    console.log(err)
})

router.get("/", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})

// let categoryScheama = new mongoose.Schema({
//     series: String,
//     url: String,
//     products: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'product'
//     }]



// })

// let productScheama = new mongoose.Schema({
//     name: String,
//     series: String,
//     url: String,
//     description: String,
//     info: Array

// })

// const Category = mongoose.model("category", categoryScheama)
// const Product = mongoose.model("product", productScheama)



//code to create new series
router.post("/createseries", (req, res) => {
    const { series } = req.body;

    const response = new Category({
        series
    })

    response.save().then((response) => {
        res.status(200).json({ message: "succesfully created new category", data: response })

    }).catch((err) => {
        res.send(err)
    })



})


//code to update a series
router.put('/update', (req, res) => {
    let user_id = '633cfb33f689dbd01f895639'

    Product.findByIdAndUpdate(user_id, { name: "bansuri", info },
        function (err, docs) {
            if (err) {
                res.send(err)
            }
            else {
                res.send("doc updated succesfullyy.....")
                //console.log("Updated User : ", docs);
            }
        });
})

//code to delet a perticular series from database
router.delete('/delete', (req, res) => {
    let id = '633d07f6cb8583db7c84e878'
    let series = "music"
    Product.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            res.send(err)
        }
        else {

            Category.updateOne({ series: series }, { $pull: { products: { $eq: id } } }, (err, docs) => {

                if (err) {
                    res.send(err)
                }
                else {
                    res.send("document deleted succesfully......")
                }
            })

        }
    });
})

//add new product to series
router.post("/addproduct", (req, res) => {
    const { series, name, description, info } = req.body
    const product = new Product({
        name,
        series,
        description,
        info
    })
    product.save().then((val) => {
        Category.updateOne({ series: series }, { $addToSet: { products: val._id } }, (err, docs) => {

            if (err) {
                res.send(err)
            }
            else {
                res.send(docs)
            }
        })
    }).catch((err) => {
        res.send(err)
    })
})

//get all products 
router.get("/getall", (req, res) => {
    Category.find()
        .populate('products').exec((err, all) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(all)
            }
        })

})

module.exports = router