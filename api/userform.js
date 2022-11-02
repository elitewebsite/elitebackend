const express = require("express")
const myForm = require('../Models/UserformModel')
const router = express.Router();

router.post('/getformdetails', (req, res) => {
    const { name, email, message } = req.body;
    const Details = new myForm({
        name, email, message
    })
    Details.save().then(() => {
        res.status(200).send("form details submitted succesfully...")
    }).catch(() => {
        res.status(400).send("error in contact form")
    })
})

module.exports = router;