const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();

//product scheamas
const Category = require("../Models/Series")
const Product = require("../Models/Product")
const Light = require("../Models/Light")
//middlewear to cheack user logged in or not
const cheackUser = require("../Middlewears/cheackUser")

const Verify = require("../Middlewears/verifyUser")
const cloudinaryImageUploadMethod = require("../Functions/uploader")
const deletFolder = require("../Functions/delter")
//connection string
const connection = "mongodb+srv://Muchmark:mLlrGljRs180tAAS@cluster0.irij3nk.mongodb.net/Elite?retryWrites=true&w=majority"


//connect to a mongodb
mongoose.connect(connection).then((res) => {


}).catch((err) => {
    console.log(err)
})


//home page
router.get("/", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})

//create main light category
router.post("/createlight", async (req, res) => {
    // const { name } = req.body
    // console.log(req.body.myfile)
    //const file=req.files.myfile
    
    const { name } = req.body;
    const url = await cloudinaryImageUploadMethod(req.files.myfile)
    //console.log(req.body)
    // console.log(req.files.myfile)



   // console.log(req.headers['authorization'])
    // res.json({ status: "ok" })

    const light = new Light({ name, url })
    light.save().then((val) => {
        res.status(200).send(`light category created ${val}`)
    }).catch((err) => {
        res.status(400).send("category not created..")
    })
})



//get all categories from main light
router.get("/getlightcategory", (req, res) => {

    Light.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send("error in fetching..")
    })

})



//code to create new series
router.post("/createseries", cheackUser, (req, res) => {
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

//update series name or url
router.put("/updateseries", cheackUser, (req, res) => {
    //const { id, name } = req.body
    let id = "63395a94d33fac1f889eedf0"
    const series = "mobile accesseries"
    Category.findByIdAndUpdate(id, { series }, function (err, docs) {
        if (err) {
            res.send(err)
        }
        else {
            res.send("doc updated succesfullyy.....")
            //console.log("Updated User : ", docs);
        }
    });


})


//code to update a product from series
router.put('/updateproduct', cheackUser, (req, res) => {
    let user_id = '633cfb33f689dbd01f895639'


    Product.findByIdAndUpdate(user_id, { name: "bansuriya" },
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

//code to delet a perticular product from database
router.delete('/delete', cheackUser, (req, res) => {
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
router.post("/addproduct", cheackUser, (req, res) => {
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
                res.json(all)
            }
        })

})

module.exports = router