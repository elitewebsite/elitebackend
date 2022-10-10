const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const auth = require("./api/auth")
const admincrud = require("./api/admincrud")
const homedynamic = require("./api/homedynamic")
const cors = require("cors")
const dotenv = require('dotenv')
const port = process.env.PORT || 3032;

//const fs=require("fs")
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(cors())
// for parsing application/json
app.use(bodyParser.json());
const fileupload = require("express-fileupload")

app.use(fileupload({
    useTempFiles: true,

}))

//const file = require("./tmp")
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
//use midddlewears routes

app.use('/auth', auth)
app.use('/admincrud', admincrud)
app.use('/homedynamic', homedynamic)
//fs.rmSync("./temp", { recursive: true, force: true })
//app listening
app.listen(port, () => { console.log(`app is successfully lisstening on ${port}}`) })