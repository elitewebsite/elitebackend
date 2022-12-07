const jwt = require("jsonwebtoken")
require('dotenv').config()

//track the user with jwt token
function cheackrootUser(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secure_key)
            req.user = decoded.email
            if (decoded.email === "elite@gmail.com" && decoded.password === "elite@1234") {
                next()
            }
            else {
                res.status(400).send("unauthorized")
            }

        }
        catch {
            res.status(401).send("Invalid Credentials")
        }
    }
    else {
        res.status(401).send('Invalid Credentials')
    }
}
module.exports = cheackrootUser