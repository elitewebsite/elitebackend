var cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')
dotenv.config()
//upload images to cloudinary
const cloudinaryImageUploadMethod = async file => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.tempFilePath, {
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true
        }, (err, res) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(
                    res.url
                )
            }
        }
        )
    })
}

module.exports = cloudinaryImageUploadMethod;
