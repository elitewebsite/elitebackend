const express = require("express")
const router = express.Router();
const Homedynamic = require("../Models/Homedynamic")

const cheackUser = require("../Middlewears/cheackUser")
const cloudinaryImageUploadMethod = require("../Functions/uploader")
const deletFolder = require("../Functions/delter")
//delete the temporary folder which stores the images buffer

//update the hom epage content
router.post("/updatehomepage", cheackUser, async (req, res) => {
    //get images from database
    const carousel1 = req.files.file1;
    const carousel2 = req.files.file2;
    const about1 = req.files.file3;
    const about2 = req.files.file4;

    //create aboject to store  in database
    const info = {
        carousel: [{
            "title": req.body.carousel1title,
            "url": await cloudinaryImageUploadMethod(carousel1)
        },
        {
            "title": req.body.carousel2title,
            "url": await cloudinaryImageUploadMethod(carousel2)
        }],

        about: [
            {
                img: await cloudinaryImageUploadMethod(about1),
                title: req.body.about1title,
                content: req.body.about1desc

            },
            {
                img: await cloudinaryImageUploadMethod(about2),
                title: req.body.about2title,
                content: req.body.about2desc
            }
        ]
    }

    Homedynamic.findByIdAndUpdate("633eb9fa6f9a4fc7ec957b87", { carousel: info.carousel, about: info.about }).then(async (res) => {
        await deletFolder()
        res.status(200).send("doc updated succesfully..")
    }).catch((err) => {
        res.status(400).send(err)
    })
})

// View Home page publically on website
router.get("/getdynamic", (req, res) => {
    Homedynamic.find().then((val) => {
        res.status(200).send(val[0])
    }).catch((err) => {
        res.status(400).send(err)
    })
})
module.exports = router;