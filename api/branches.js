const express = require("express")
const router = express.Router();
const Branches = require("../Models/Branches")
const cheackUser = require("../Middlewears/cheackUser")

//Delete: branch from database
router.post('/deletebranch', cheackUser, (req, res) => {
    const { id } = req.body
    Branches.findByIdAndDelete(
        id, function (err, docs) {
            if (err) {
                res.status(400).send("error occured while delete the document")
            }
            else {
                res.status(200).send("document deleted succesfully")
            }
        }
    )
})

//Read: get perticular branch for updation
router.post('/getbranchbyid', cheackUser, (req, res) => {
    const { id } = req.body
    Branches.findById(id).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send("error occured in updation sorry ")
    })

})


//Update:update specific branch
router.post('/updatebranch', cheackUser, (req, res) => {
    const { id, branch_city, branch_name, address, contact, email } = req.body;

    Branches.findByIdAndUpdate(id, { branch_city, branch_name, address, contact, email }, function (err, docs) {
        if (err) {
            res.status(400).send("sorry unable to update document")
        }
        else {
            res.status(200).send("documnet updated successfully")
        }
    })

})

//Read: get all branch details public
router.get('/getbranches', (req, res) => {
    Branches.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send(err)
    })
})


//Create: Branch with details given by frontend
router.post('/getbranchdetails', cheackUser, (req, res) => {
    const { branch_city, branch_name, address, contact, email } = req.body;
    const Branch = new Branches({
        branch_name, branch_city, address, contact, email
    })
    Branch.save().then((val) => [
        res.status(200).send("branch added succcesfulyy")
    ]).catch((err) => {
        res.status(400).send("sorry error occured")
    })

})

//Read : get all branch name for sequence change
router.get('/getbranchesnames', (req, res) => {
    Branches.find({}, { branch_name: 1 }).then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//change sequence of branch
router.post('/changebranchsequence', cheackUser, (req, res) => {
    const { branch_id, branch_order } = req.body
    Branches.updateOne({ _id: branch_id }, {
        $set: {
            sequence_no: branch_order
        }
    }).then((result) => {
        res.status(200).send("okk")
    }).catch((err) => {
        res.send("error found")
    })
})

module.exports = router;