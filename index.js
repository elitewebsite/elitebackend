const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")

//******import router modules *****************/
const auth = require("./api/auth")
const admincrud = require("./api/admincrud")
const homedynamic = require("./api/homedynamic")
const userforms = require("./api/userform")
const branches = require("./api/branches")
const dynamicgallery = require("./api/dynamicgallery")
const getfeaturedproducts = require("./api/featuredproducts")
const homepagecarousel = require("./api/homepagecarosel")
const aboutus = require("./api/aboutus")
//*****************import end ************* */
const cors = require("cors")
const dotenv = require('dotenv')
const port = process.env.PORT || 3032;
dotenv.config()
app.use(cors())
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles: false,
}))
app.use('/auth', auth)
app.use('/admincrud', admincrud)
app.use('/homedynamic', homedynamic)
app.use('/getfomdata', userforms)
app.use('/branch', branches)
app.use("/dynamicgallery", dynamicgallery)
app.use("/dynamicfeaturedproducts", getfeaturedproducts)
app.use("/homepagecarousel", homepagecarousel)
app.use("/apiforabout", aboutus)

//app listening
app.listen(port)