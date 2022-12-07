const mongoose = require("mongoose")

let branchScheama = new mongoose.Schema({

    branch_city: String,
    branch_name: String,
    address: String,
    email: String,
    contact: Array

})

module.exports = mongoose.model("branches", branchScheama)