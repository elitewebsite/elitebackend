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
router.post("/updatehomepage", async (req, res) => {
    //create aboject to store  in database
    file3 = await cloudinary.uploader.upload(req.body.file3)
    file4 = await cloudinary.uploader.upload(req.body.file4)
    const { info } = req.body
    const parsedInfo = JSON.parse(info)

    let finalimages = parsedInfo.map(async (val) => {
        const myvalue = await cloudinary.uploader.upload(val)
        return { title: val.title, image: { url: myvalue.url, public_id: myvalue.public_id } }
    })

    //actually returning the bulk images
    let imageResponses = await Promise.all(finalimages);

    const about = [
        {
            img: {
                url: file3.url,
                public_id: file3.public_id
            },
            title: req.body.about1title,
            content: req.body.about1desc
        },
        {
            img: {
                url: file3.url,
                public_id: file3.public_id
            },
            title: req.body.about2title,
            content: req.body.about2desc
        }
    ]
 
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