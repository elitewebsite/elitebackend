const express = require("express")
const myForm = require('../Models/UserformModel')
const router = express.Router();
const cheackUser = require("../Middlewears/cheackUser")
//Getting details from contact form
router.post('/getformdetails', (req, res) => {
    const { name, email, message, contact } = req.body;
    const Details = new myForm({
        name, email, message, contact, createdAt: {
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString()
        }
    })
    Details.save().then(() => {
        res.status(200).send("form details submitted succesfully...")
    }).catch(() => {
        res.status(400).send("error in contact form")
    })
})

//get all queries
router.get('/showformdetails', cheackUser, (req, res) => {
    myForm.find().sort([["_id", -1]]).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send(err)
    })

})


module.exports = router;