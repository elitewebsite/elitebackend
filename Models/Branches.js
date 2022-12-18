// Schema for Dynamic Branches
const mongoose = require("mongoose")
let branchScheama = new mongoose.Schema({
    sequence_no: {
        type: Number,
        default: 10
    },
    branch_city: String,
    branch_name: String,
    address: String,
    email: String,
    contact: Array

})

module.exports = mongoose.model("branches", branchScheama)