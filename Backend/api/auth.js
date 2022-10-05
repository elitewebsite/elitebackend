const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")


function cheackAuth(req, res, next) {
    // console.log(req.body.token)
    // console.log(req.body.token)
    //const token = req.headers.authorization.split(' ')[1]
    // console.log(token)
    if (!req.body.token) {
        res.status(404).send("token is must")
    }
    else {
        try {
            const decoded = jwt.verify(req.body.token, "secret@123")
            // res.user = decoded.email
            next()
        }
        catch {
            res.send("error in authentication")
        }
    }




}
router.get("/", (req, res) => {
    res.send("hello wrold")
})

router.get("/private", cheackAuth, (req, res) => {
    res.send("welcome to private page..")


})
// router.post("/login", (req, res) => {
//     console.log(req.body)

//     res.send("ok")
// })

router.post("/login", (req, res) => {
    const { email, password } = req.body
    const token = jwt.sign({ email, password },
        "secret@123",
        { expiresIn: "30s" }
    )
    res.send(token)

})

module.exports = router;

