var cloudinary = require('cloudinary').v2;

//cloudinary configuration..
// cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_key,
//     secure: true
// });


//upload images to cloudinary
const cloudinaryImageUploadMethod = async file => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.tempFilePath, {
            cloud_name: 'dibwyka4z',
            api_key: '976358469583163',
            api_secret: 'kLaYxxHEXKyevL-MZNbgwDrE7-o',
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

module.exports=cloudinaryImageUploadMethod;
