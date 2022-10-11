var cloudinary = require('cloudinary').v2;

//cloudinary configuration..
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_key,
    secure: true
});


//upload images to cloudinary
const cloudinaryImageUploadMethod = async file => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file.tempFilePath, (err, res) => {
            if (err) return res.status(500).send("upload image error")
            resolve(
                res.url
            )
        }
        )
    })
}

module.exports=cloudinaryImageUploadMethod;
