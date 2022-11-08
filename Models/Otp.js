const mongoose = require("mongoose")
let otpScheama = new mongoose.Schema({
    name: {
        type: String,
        expires: 60

    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1m' },
    },

})
module.exports = mongoose.model("otp", otpScheama)