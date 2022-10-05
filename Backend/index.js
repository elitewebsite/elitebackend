const cors = require("cors")
const express = require("express")
const app = express()
const auth = require("./api/auth")
const admincrud = require("./api/admincrud")
const dotenv = require('dotenv')
const port = process.env.PORT || 3032;
dotenv.config()
app.use(express.json())
app.use(cors())

//use midddlewears routes
app.use('/auth', auth)
app.use('/admincrud', admincrud)

//app listening
app.listen(port, () => { console.log(`app is successfully lisstening on ${port}}`) })