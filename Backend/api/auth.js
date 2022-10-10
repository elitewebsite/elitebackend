const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const cheackUser = require("../Middlewears/cheackUser")
const User = require("../Models/User")
const Verify = require("../Middlewears/verifyUser")

//private route user should be logged in to create user
router.post("/newuser", cheackUser, (req, res) => {

    const { email, password } = req.body;
    const user = new User({ email, password })
    user.save().then((val) => {
        res.status(200).json({ data: user })

    }).catch((err) => {

        res.status(400).json({ msg: err })
    })
})


//delte user
router.post("/deleteuser", cheackUser, (req, res) => {

    const { id } = req.body;
    User.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            res.status(400).json(err)
        }
        else {
            res.status(200).json({ msg: "user deleted succesfully" })
        }
    })
})

//private route
router.post("/private", cheackUser, (req, res) => {

    res.status(200).json({ message: `helloo ${req.user}` })
})


//login route 
router.post("/login", Verify, (req, res) => {

    const data = req.body.data
    const token = jwt.sign({ email: data.email, password: data.password },
        "secret@123",
        { expiresIn: "20s" }
    )
    res.json({ token: token })

})

module.exports = router;

