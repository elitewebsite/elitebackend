const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const fs = require('fs')
//product scheamas
const Category = require("../Models/Series")
const Product = require("../Models/Product")
const Light = require("../Models/Light")
const User = require("../Models/User")
require('dotenv').config();
//middlewear to cheack user logged in or not
const cheackUser = require("../Middlewears/cheackUser")

//connection string
const connection = `mongodb+srv://newelitedynamicwebsite:${process.env.mongodb_password}@cluster0.1ee4by5.mongodb.net/Elite?retryWrites=true&w=majority`

//cloudinary setup
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

//connect to a mongodb
mongoose.connect(connection).then((res) => {
}).catch((err) => {
    console.log(err)
})

fs.readFile

// ************************* Main Light Category Section ***********************
//create main light category
router.post("/createlight", cheackUser, async (req, res) => {
    const { name, myfile } = req.body;
    try {
        const response = await cloudinary.uploader.upload(myfile)
        const light = new Light({ name, url: response.url })
        light.save().then(async (val) => {
            res.status(200).send(`Light category created`);
        }).catch(async (err) => {
            res.status(400).send("Category not created..")
        })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//update main light category
router.post('/updatelight', cheackUser, async (req, res) => {
    const { id, name, myfile } = req.body;
    try {
        const response = await cloudinary.uploader.upload(myfile)
        Light.findByIdAndUpdate(id, { name, url: response.url }, async (err, docs) => {
            if (err) {
                res.status(400).send(err)
            }
            else {
                res.status(200).send("Doc updated successfully..")
            }
        })
    }
    catch (err) {
        res.status(400).send(err)
    }
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
    const { mainlight, series, myfile } = req.body;
    try {
        const responseCloud = await cloudinary.uploader.upload(myfile)
        const response = new Category({
            mainlight, series, url: responseCloud.url
        })

        response.save().then(async (response) => {
            res.status(200).send("succesfully created new category")

        }).catch((err) => {
            console.log(err)
            res.status(400).send('Internal server error')
        })
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

//Read :get light categories by id it will give single result
router.post("/getseriesbyid", cheackUser, (req, res) => {
    const { id } = req.body;
    Category.findById(id, { products: 0 }).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send("Error in fetching...")
    })
})

//Read all series with all data default public for main website
router.get("/getallseries", (req, res) => {
    const { main_light } = req.query
    
    Category.find({ mainlight:main_light }).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send("error document not found")
    })
})


//Get all series names only 
router.get("/getseriesname", cheackUser, (req, res) => {
    Category.find({}, { series: 1, _id: 1 }).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send("Error document not found")
    })
})

//Update: series name, image url and main light category name
router.post("/updateseries", cheackUser, async (req, res) => {
    const { id, series, mainlight, myfile } = req.body
    try {
        const responseCloud = await cloudinary.uploader.upload(myfile)
        Category.findByIdAndUpdate(id, { series, url: responseCloud.url, mainlight }, async function (err, docs) {
            if (err) {
                res.status(400).send('Oops..Not updated')
            }
            else {
                res.status(200).send("Document updated succesfullyy.....")
            }
        });
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//chanage the order of a series
router.post("/changeseriesorder", cheackUser, (req, res) => {
    const { series_id, order } = req.body
    Category.updateOne({ _id: series_id }, {
        $set: {
            sequence_no: order
        }
    }).then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.send("error found")
    })
    // res.status(200).send("order " )

})


//Delete delete a perticular series
router.post("/deleteseries", cheackUser, (req, res) => {
    const { id, series } = req.body;
    Category.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            res.status(400).send("document not deleted")
        }
        else {
            Product.deleteMany({ series_name: series }, function (err, docs) {
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
router.post("/addproduct", async (req, res) => {
    const { series_name,
        product_name,
        model_no,
        product_description,
        info,
        news,
        youtube,
        images,
        pdffile } = req.body

    try {
        const infofinal = JSON.parse(info)
        const newyoutube = JSON.parse(youtube)
        const imagesarr = JSON.parse(images)
        const pdfsarr = JSON.parse(pdffile)
        const newsarr = JSON.parse(news)
        // ************************************************/
        const product = new Product({
            // main product details
            series_name,
            product_name,
            model_no,
            product_description,
            images: imagesarr,
            // navpills section 
            info: infofinal,
            pdflink: pdfsarr,
            news: newsarr,
            youtube: newyoutube,
        })
        product.save().then((val) => {
            Category.updateOne({ series: series_name }, { $addToSet: { products: val._id } }, async (err, docs) => {

                if (err) {
                    res.status(400).send('Oops something went wrong..')
                }
                else {

                    res.status(200).send("Product added succesfully...")
                }
            })
        }).catch((err) => {
            res.status(400).send(err)
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
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
        youtube,
        images,
        pdffile
    } = req.body

    const infofinal = JSON.parse(info)
    const newyoutube = JSON.parse(youtube)
    const imagesarr = JSON.parse(images)
    const pdfsarr = JSON.parse(pdffile)
    const newsarr = JSON.parse(news)
    //************************************************/

    try {
        Product.findByIdAndUpdate(id, {
            series_name,
            product_name,
            model_no,
            product_description,
            images: imagesarr,

            //navpills section 
            info: infofinal,
            pdflink: pdfsarr,
            news: newsarr,
            youtube: newyoutube
        },
            async function (err, docs) {
                if (err) {
                    res.status(400).send("Something went wrong..")
                }
                else {
                    //*******************************************/
                    //delete all images  from cloudinary
                    const resuls = docs.images.map(async (val, idx) => {
                        await cloudinary.uploader.destroy(val.public_id)
                    })
                    await Promise.all(resuls);
                    // delete all pdf files from cloudinary
                    const resuls1 = docs.pdflink.map(async (val, idx) => {
                        await cloudinary.uploader.destroy(val.public_id, {
                            resource_type: "raw",
                            invalidate: true,
                        })
                    })
                    await Promise.all(resuls1);
                    //*******************************/
                    res.status(200).send("Doc updated successfully...")
                }
            });
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//Delete:code to delet a perticular product from database
router.post('/deleteproduct', cheackUser, (req, res) => {
    const { id, series } = req.body;
    Product.findByIdAndDelete(id, function (err, docsmain) {
        if (err) {
            res.status(400).send("Something went wrong.....")
        }
        else {
            Category.updateOne({ series }, { $pull: { products: { $eq: id } } }, async (err, docs) => {
                if (err) {
                    res.status(400).send("Error Occured")
                }
                else {
                    //*******************************************/
                    //delete all images  from cloudinary
                    const resuls = docsmain.images.map(async (val, idx) => {
                        await cloudinary.uploader.destroy(val.public_id)
                    })
                    await Promise.all(resuls);
                    // delete all pdf files from cloudinary
                    const resuls1 = docsmain.pdflink.map(async (val, idx) => {
                        await cloudinary.uploader.destroy(val.public_id, {
                            resource_type: "raw",
                            invalidate: true,
                        })
                    })
                    await Promise.all(resuls1);
                    //*******************************/
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
    const series_name = req.query.series

    Product.find({ series_name }, { pdflink: 0, news: 0, youtube: 0, product_description: 0 }).sort([["series", -1]]).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send('Something went wrong')
    })
})
//get only product names for changing indexing of the user
router.post("/getallproductsfororder", cheackUser, (req, res) => {
    const { series_name } = req.body
    Product.find({ series_name }, { product_name: 1, _id: 1 }).then((data) => {
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

router.get("/getanalyticsdata", cheackUser, async (req, res) => {
    const result1 = await Category.count()
    const result2 = await Light.count()
    const result3 = await Product.count()
    const result4 = await User.count()
    const final = {
        series: result1,
        mainlight: result2,
        product: result3,
        users: result4
    }
    res.status(200).send(final)
})


router.post("/changeproductorder", cheackUser, (req, res) => {
    const { product_id, order } = req.body
    Product.updateOne({ _id: product_id }, {
        $set: {
            sequence_no: order
        }
    }).then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.send("error found")
    })
    // res.status(200).send("order " )

})

// ************************ Peoducts Section End ***********************

module.exports = router