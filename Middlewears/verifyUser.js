const User = require("../Models/User")

function verifyUser(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email, password }).then((val) => {
        req.user = val.email
        next();
    }).catch((err) => {
        res.status(401).send("User Not Found")
    })
}

module.exports = verifyUser