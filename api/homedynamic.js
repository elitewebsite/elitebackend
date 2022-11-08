const express = require("express")
const router = express.Router();
const Homedynamic = require("../Models/Homedynamic")
const cheackUser = require("../Middlewears/cheackUser")
//delete the temporary folder which stores the images buffer
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});
//update the hom epage content
router.post("/updatehomepage", cheackUser, async (req, res) => {
    //create aboject to store  in database
    file1 = await cloudinary.uploader.upload(req.body.file1)
    file2 = await cloudinary.uploader.upload(req.body.file2)
    file3 = await cloudinary.uploader.upload(req.body.file3)
    file4 = await cloudinary.uploader.upload(req.body.file4)

    try {
        const info = {
            carousel: [{
                "title": req.body.carousel1title,
                "url": file1.url
            },
            {
                "title": req.body.carousel2title,
                "url": file2.url
            }],

            about: [
                {
                    img: file3.url,
                    title: req.body.about1title,
                    content: req.body.about1desc

                },
                {
                    img: file4.url,
                    title: req.body.about2title,
                    content: req.body.about2desc
                }
            ]
        }
        Homedynamic.findByIdAndUpdate("636a3d719f2b55693070f6ec", { carousel: info.carousel, about: info.about }).then(async (respo) => {
            res.status(200).send("doc updated succesfully..")
        }).catch((err) => {
            res.status(400).send(err)
        })
    }
    catch (e) {
        res.status(400).send(err)
    }

})

// View Home page publically on website
router.get("/getdynamic", (req, res) => {
    Homedynamic.find().then((val) => {
        res.status(200).send(val[0])
    }).catch((err) => {
        res.status(400).send(err)
    })
})


router.get("/addhomedynamic", (req, res) => {
    const info = {
        carousel: [{
            "title": "",
            "url": ""
        },
        {
            "title": "",
            "url": ""
        }],

        about: [
            {
                img: "",
                title: "",
                content: ""

            },
            {
                img: "",
                title: "",
                content: ""
            }
        ]
    }
    const homedynamic = new Homedynamic({ carousel: info.carousel, about: info.about });
    homedynamic.save().then(() => {
        res.status(200).send("status is ok")
    }).catch((err) => {
        res.status(400).send("error in addtion")
    })

})
module.exports = router;