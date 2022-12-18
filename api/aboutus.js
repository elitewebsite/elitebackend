const express = require("express")
const router = express.Router();
const cheackUser = require("../Middlewears/cheackUser")
const About = require("../Models/About")
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

//adding about us details to the database
router.post("/addaboutdetails", cheackUser, async (req, res) => {
    file3 = await cloudinary.uploader.upload(req.body.file3)
    file4 = await cloudinary.uploader.upload(req.body.file4)
    const about = [
        {
            image: {
                url: file3.url,
                public_id: file3.public_id
            },
            title: req.body.about1title,
            content: req.body.about1desc
        },
        {
            image: {
                url: file3.url,
                public_id: file3.public_id
            },
            title: req.body.about2title,
            content: req.body.about2desc
        }
    ]
    const myabout = new About({
        about
    })

    myabout.save().then((val) => {
        res.status(200).send("added succesfully")
    }).catch((err) => {
        res.status(400).send("error while adding")
    })
})


//update g about us details to the database
router.post("/updateaboutdetails", cheackUser, async (req, res) => {

    try {
        //getting files from  frotend
        file3 = await cloudinary.uploader.upload(req.body.file3)
        file4 = await cloudinary.uploader.upload(req.body.file4)
        const about = [
            {
                image: {
                    url: file3.url,
                    public_id: file3.public_id
                },
                title: req.body.about1title,
                content: req.body.about1desc
            },
            {
                image: {
                    url: file4.url,
                    public_id: file4.public_id
                },
                title: req.body.about2title,
                content: req.body.about2desc
            }
        ]

        //update 
        About.findByIdAndUpdate("638d93d89a14634a64478d64", {
            about
        }, async (err, docs) => {
            if (err) {
                res.status(400).send(err)
            }
            else {
                //delete images from cloudinary
                const myrespo = docs.about.map(async (respo1, idx1) => {
                    await cloudinary.uploader.destroy(respo1.image.public_id)
                })
                await Promise.all(myrespo)
                res.status(200).send('doc updated successffully..')
            }
        })

    }
    catch (e) {
        console.log(e)
        res.status(400).send("sorry errr occured")
    }
})

//Read: get about us  details
router.get('/getaboutdetails', (req, res) => {
    About.findById("638d93d89a14634a64478d64").then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(400).send("internal server error..")
    })

})
module.exports = router