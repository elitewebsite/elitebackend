const User = require("../Models/User")

function verifyUser(req, res, next) {
    //const data = req.body.data;
    const { email, password } = req.body;
    User.findOne({ email, password }).then((val) => {
        req.user = val.email
        next();
    }).catch((err) => {
        res.status(404).json({ msg: "user not found" })
    })
}

module.exports = verifyUser