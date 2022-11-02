const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const auth = require("./api/auth")
const admincrud = require("./api/admincrud")
const homedynamic = require("./api/homedynamic")
const userforms = require("./api/userform")
const cors = require("cors")
const dotenv = require('dotenv')
const port = process.env.PORT || 3032;
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(bodyParser.json());
const fileupload = require("express-fileupload")

app.use(fileupload({
    useTempFiles: true,

}))


app.use(bodyParser.urlencoded({ extended: true }));


app.use('/auth', auth)
app.use('/admincrud', admincrud)
app.use('/homedynamic', homedynamic)
app.use('/getfomdata', userforms)
//app listening
app.listen(port)