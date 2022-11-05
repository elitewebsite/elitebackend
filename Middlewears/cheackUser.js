const jwt = require("jsonwebtoken")
require('dotenv').config()
//track the user with jwt token
function cheackUser(req, res, next) {
    const token = req.headers['authorization'];
   
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secure_key)
            req.user = decoded.email
            next()
        }
        catch {
            res.status(401).send("Invalid Credentials")
        }
    }
    else {

        res.status(401).send('Invalid Credentials')
    }
}
module.exports = cheackUser