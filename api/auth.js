const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../Models/User")
const Verify = require("../Middlewears/verifyUser")
const Cheackrootuser = require("../Middlewears/rootUser")
require('dotenv').config()

//private route user should be logged in to create user
router.post("/newuser", Cheackrootuser, async (req, res) => {
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

// Get all users private
router.get("/getalluser", Cheackrootuser, (req, res) => {
    User.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//delte user private
router.post("/deleteuser", Cheackrootuser, (req, res) => {
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

//login route  verify 
router.post("/login", Verify, (req, res) => {
const { email, password } = req.body
    const token = jwt.sign({ email, password },
        process.env.secure_key,
        { expiresIn: "3h" }
    )
    res.json({ token: token })
})

module.exports = router;