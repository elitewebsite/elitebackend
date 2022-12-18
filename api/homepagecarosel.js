const express = require("express")
const router = express.Router();
const cheackUser = require("../Middlewears/cheackUser");
const HomeCarsosel = require("../Models/HomeCarsosel");
const HomeCarosel = require("../Models/HomeCarsosel")
//delete the temporary folder which stores the images buffer
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

// router.post("/addcarouseldetails", async (req, res) => {
//     const { info } = req.body
//     const parsedInfo = JSON.parse(info)
//     //upload images to cloudinary
//     let finalimages = parsedInfo.map(async (val) => {
//         const myvalue = await cloudinary.uploader.upload(val.image)
//         return { title: val.title, image: { url: myvalue.url, public_id: myvalue.public_id } }
//     })
//     const imagetosave = await Promise.all(finalimages)
//     console.log(imagetosave)
//     const addCarsoel = new HomeCarosel({
//         info: imagetosave
//     })
//     addCarsoel.save().then((respo) => {
//         res.status(200).send("image adde succesfully..")
//     }).catch((err) => {
//         res.status(400).send("soorry image opration failed")
//     })

// })

//update carosel images 
router.post("/updatecarouseldetails", cheackUser, async (req, res) => {
    const { info } = req.body
    //parse the data
    const parsedInfo = JSON.parse(info)
    //update carousel document
    HomeCarsosel.findByIdAndUpdate("638d7d7b81120cc057b532e6", {
        info: parsedInfo
    }, async (err, val) => {
        if (err) {
            res.status(400).send("sorry carousel not updated")
        }
        else {
            const myrespo = val.info.map(async (respo1, idx1) => {
                await cloudinary.uploader.destroy(respo1.public_id)
            })
            await Promise.all(myrespo)
            res.status(200).send('doc updated successffully..')
        }
    })
})


//Read: get carosuel details
router.get('/getcarouseldetails', (req, res) => {
    HomeCarosel.findById("638d7d7b81120cc057b532e6").then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(400).send("internal server error..")
    })

})
module.exports = router;