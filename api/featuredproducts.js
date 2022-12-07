const Featured = require('../Models/Featured')
const express = require('express')
const router = express.Router();
var cloudinary = require('cloudinary').v2;
const cheackUser = require("../Middlewears/cheackUser")

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

//Sending all featured products to DB
router.post('/setfeaturedproducts',cheackUser, async (req, res) => {
    const { myfile, name } = req.body;
    try {
        const file1 = await cloudinary.uploader.upload(myfile);
        const newImage = Featured({
            name: name,
            image: {
                public_id: file1.public_id,
                url: file1.url
            }
        })

        newImage.save().then((val) => {
            res.status(200).send("Featured Product Added..")
        }).catch((err) => {
            res.status(400).send("Something went wrong...")
        })
    }
    catch {
        res.status(400).send("Internal Server Error")
    }
})

//Getting all fetured products public
router.get("/getfeaturedproducts", (req, res) => {
    Featured.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//Deleting Featurd products
router.post("/deletefeturedproducts",cheackUser, (req, res) => {
    const { id } = req.body;
    Featured.findByIdAndDelete(id, async (err, docs) => {
        if (err) {
            res.status(400).send("sorry something went wrong")
        }
        else {
            await cloudinary.uploader.destroy(docs.image.public_id)
            res.status(200).send("delted succesfulyy..")
        }
    })
})



module.exports = router;
