const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const cheackUser = require("../Middlewears/cheackUser")
const User = require("../Models/User")
const Verify = require("../Middlewears/verifyUser")
require('dotenv').config()
//private route user should be logged in to create user
router.post("/newuser", cheackUser, async (req, res) => {
    const { email, password } = req.body;
    const user = await User.find({ email })

    if (user.email) {
        res.status(400).send("user alreday exist")
    }

    else {
        const user = new User({ email, password })
        user.save().then((val) => {
            res.status(200).send("New User created successfully")
        }).catch((err) => {
            res.status(400).send("User not created")
        })
    }
})

// Get all users
router.get("/getalluser", cheackUser, (req, res) => {
    User.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//delte user
router.post("/deleteuser", cheackUser, (req, res) => {
    const { id } = req.body;
    User.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            res.status(400).send(err)
        }
        else {
            res.status(200).send('User Deleted Successfully..')
        }
    })
})

//private route
router.post("/private", cheackUser, (req, res) => {

    res.status(200).json({ message: `helloo ${req.user}` })
})

//login route 
router.post("/login", Verify, (req, res) => {

    const { email, password } = req.body
    const token = jwt.sign({ email, password },
        process.env.secure_key,
        { expiresIn: "1h" }
    )
    res.json({ token: token })
})

module.exports = router;