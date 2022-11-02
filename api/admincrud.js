const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();

//product scheamas
const Category = require("../Models/Series")
const Product = require("../Models/Product")
const Light = require("../Models/Light")
require('dotenv').config();

//middlewear to cheack user logged in or not
const cheackUser = require("../Middlewears/cheackUser")

const Verify = require("../Middlewears/verifyUser")
const cloudinaryImageUploadMethod = require("../Functions/uploader")
const deletFolder = require("../Functions/delter")

//connection string
var cloudinary = require('cloudinary').v2;
const connection = `mongodb+srv://Muchmark:${process.env.mongodb_password}.irij3nk.mongodb.net/Elite?retryWrites=true&w=majority`

//connect to a mongodb
mongoose.connect(connection).then((res) => {

}).catch((err) => {
    console.log(err)
})



// ************************* Main Light Category Section ***********************
//create main light category
router.post("/createlight", cheackUser, async (req, res) => {

    const file = req.files.myfile
    const { name } = req.body;
    let url;
    res.send("image not uploaded..")
    // try {
    //     url = await cloudinaryImageUploadMethod(file)
    //     const light = new Light({ name, url })
    //     light.save().then(async (val) => {

    //         res.status(200).send(`Light category created`);

    //     }).catch(async (err) => {

    //         res.status(400).send("Category not created..")
    //     })
    // }
    // catch (err) {

    //     res.status(400).send(err)
    // }

})

//update main light category
router.post('/updatelight', cheackUser, async (req, res) => {
    const file = req.files.myfile
    const { id, name } = req.body;
    try {
        url = await cloudinaryImageUploadMethod(file)
    }
    catch (err) {
        res.status(400).send(err)
    }

    Light.findByIdAndUpdate(id, { name, url }, async (err, docs) => {
        if (err) {
            res.status(400).send(err)
        }
        else {
            await deletFolder();
            res.status(200).send("Doc updated successfully..")
        }

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

//get light category find by id
router.post("/getlightcategoryid", cheackUser, (req, res) => {
    const { id } = req.body;
    Light.findById(id).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send("Error in fetching..")
    })

})

//delete main light category
router.post('/deletemainlight', cheackUser, (req, res) => {
    const { id } = req.body
    Light.findByIdAndDelete(id, (err, docs) => {
        if (err) {
            res.status(400).send('Error in deleting')
        }
        else {
            res.status(200).send("Main light category deleted succesfully...")

        }
    })
})
// *************************  Main Light Category section End **********************


// ********************************* Series Section  *******************************
//code to create new series
router.post("/createseries", cheackUser, async (req, res) => {
    const { mainlight, series } = req.body;
    const url = await cloudinaryImageUploadMethod(req.files.myfile)
    const response = new Category({
        mainlight, series, url
    })

    response.save().then(async (response) => {
        await deletFolder();
        res.status(200).send("succesfully created new category")

    }).catch((err) => {
        res.status(400).send('Internal server error')
    })
})

//Read :get light categories by id it will give single result
router.post("/getseriesbyid", cheackUser, (req, res) => {
    const { id } = req.body;
    Category.findById(id, { products: 0 }).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send("Error in fetching..")
    })

})

//Read  all series with all data
router.get("/getallseries", cheackUser, (req, res) => {
    Category.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send("error document not found")
    })
})

//Get all series names only
router.get("/getseriesname", cheackUser, (req, res) => {

    Category.find({}, { series: 1, _id: 0 }).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send("Error document not found")
    })
})

//update series name, image url and main light category name
router.post("/updateseries", cheackUser, async (req, res) => {
    const { id, series, mainlight } = req.body
    const url = await cloudinaryImageUploadMethod(req.files.myfile)
    Category.findByIdAndUpdate(id, { series, url, mainlight }, async function (err, docs) {
        if (err) {
            res.status(400).send('Oops..Not updated')
        }
        else {
            await deletFolder();
            res.status(200).send("Document updated succesfullyy.....")

        }
    });
})

//Delete delete a perticular series
router.post("/deleteseries", cheackUser, (req, res) => {
    const { id, series } = req.body;
    Category.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            res.status(400).send("document not deleted")
        }
        else {
            Product.deleteMany({ series }, function (err, docs) {
                if (err) {
                    res.status(400).send("docs not deleted")
                }
                else {
                    res.status(200).send("operation succesfully...")
                }
            })
        }

    })

})
// ************************** Series Section End ************************************


// ********************** Product Section *************************

//Create:add new product to series with all related details
router.post("/addproduct", cheackUser, async (req, res) => {
    const { series_name,
        product_name,
        model_no,
        product_description,
        info,
        news,
        youtube } = req.body

    const infofinal = JSON.parse(info)

    //get all files from user with pdf format
    const file1 = req.files.file1;
    const file2 = req.files.file2;
    const file3 = req.files.file3;
    const file4 = req.files.file4;
    const pdffile = req.files.pdffile;

    //upload pdf to cloudinary and get a link
    const pdflink = await cloudinaryImageUploadMethod(pdffile)

    // //upload images and get a cloudinary link
    const images = [
        await cloudinaryImageUploadMethod(file1),
        await cloudinaryImageUploadMethod(file2),
        await cloudinaryImageUploadMethod(file3),
        await cloudinaryImageUploadMethod(file4),
    ]

    const product = new Product({
        //main product details
        series_name,
        product_name,
        model_no,
        product_description,
        images,

        //navpills section 
        info: infofinal,
        pdflink,
        news,
        youtube
    })
    product.save().then((val) => {
        Category.updateOne({ series: series_name }, { $addToSet: { products: val._id } }, async (err, docs) => {

            if (err) {
                res.status(400).send('Oops something went wrong..')
            }
            else {
                await deletFolder();
                res.status(200).send("Product added succesfully...")
            }
        })
    }).catch((err) => {
        res.status(400).send(err)
    })
})


//Update:code to update a product from series
router.post('/updateproduct', cheackUser, async (req, res) => {
    //get data from body...
    const { id,
        series_name,
        product_name,
        model_no,
        product_description,
        info,
        news,
        youtube
    } = req.body


    const infofinal = JSON.parse(info)
    //get all files from user with pdf file 

    const file1 = req.files?.file1;
    const file2 = req.files?.file2;
    const file3 = req.files?.file3;
    const file4 = req.files?.file4;
    const pdfile = req.files?.pdffile;

    //upload pdf to cloudinary and get a link
    const pdflink = await cloudinaryImageUploadMethod(pdfile)

    //upload images and get a cloudinary link
    const images = [
        await cloudinaryImageUploadMethod(file1),
        await cloudinaryImageUploadMethod(file2),
        await cloudinaryImageUploadMethod(file3),
        await cloudinaryImageUploadMethod(file4),
    ]


    Product.findByIdAndUpdate(id, {
        series_name,
        product_name,
        model_no,
        product_description,
        images,

        //navpills section 
        info: infofinal,
        pdflink,
        news,
        youtube
    },
        async function (err, docs) {
            if (err) {
                res.status(400).send("Something went wrong..")
            }
            else {
                await deletFolder();
                res.status(200).send("Doc updated successfully...")
            }
        });
})


//Delete:code to delet a perticular product from database
router.post('/deleteproduct', cheackUser, (req, res) => {
    const { id, series } = req.body;
    Product.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            res.status(400).send("Something went wrong..")
        }
        else {

            Category.updateOne({ series }, { $pull: { products: { $eq: id } } }, (err, docs) => {

                if (err) {
                    res.status(400).send("Error Occured")
                }
                else {
                    res.status(200).send("Document deleted successfully..")
                }
            })

        }
    });
})

//Read :get single product from collection to to update

router.post('/getproductbyid', cheackUser, (req, res) => {
    const { id } = req.body
    Product.findById(id).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send(err)
    })
})


//Read :get product details for product table
router.get("/getallproducts", cheackUser, (req, res) => {
    Product.find({}, { pdflink: 0, news: 0, youtube: 0, product_description: 0 }).sort([["series", 1]]).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send('Something went wrong')
    })
})

//Read :Get all poducts populated by series by default public only for website
router.get("/getall", (req, res) => {
    const mainlight = req.query.mainlight
    Category.find({ mainlight })
        .populate('products').exec((err, all) => {
            if (err) {
                res.send(err)
            }
            else {
                res.json(all)

            }
        })

})

// ************************ Peoducts Section End ***********************

module.exports = router