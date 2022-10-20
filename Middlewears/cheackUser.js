const jwt = require("jsonwebtoken")

//track the user with jwt token
function cheackUser(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        try {
            const decoded = jwt.verify(token, "secret@123")
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