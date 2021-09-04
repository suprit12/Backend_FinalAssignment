const express = require('express')

const router = express.Router()

const Accountant = require("../Models/accounts")

const bcryptjs = require('bcryptjs')

const auth = require('../Middleware/auth')
const upload = require('../Middleware/upload')

const jwt = require('jsonwebtoken')



router.post('/register/accountant', upload.single('accountantImage'), function (req, res) {
    

    if (req.file == undefined) {
        return res.status(500).json({ message: "Only jpg and png are allowed" })
    }

    console.log('file uploading console',req.file);

    const accountantFName = req.body.accountantFName
    const accountantLName = req.body.accountantLName
    const accountantEmailAddress = req.body.accountantEmailAddress
    const accountantExperience = req.body.accountantExperience
    const accountantDOB = req.body.accountantDOB
    const accountantImage = req.file.path
    const accountantMobNo = req.body.accountantMobNo
    const gender = req.body.gender
    const accountantPassword = req.body.accountantPassword
    const pricePerDay = req.body.pricePerDay


    bcryptjs.hash(accountantPassword, 10, function (err, hash) {
        const newAccountant = new Accountant({
            accountantFName: accountantFName,
            accountantLName: accountantLName, accountantEmailAddress: accountantEmailAddress, accountantDOB: accountantDOB,
            gender: gender,
            accountantExperience: accountantExperience, accountantMobNo: accountantMobNo, accountantImage: accountantImage, accountantPassword: hash,
            pricePerDay: pricePerDay
        })

        console.log(newAccountant)

        newAccountant.save().then(function(result){
            console.log(result)
            res.status(200).json({message : "Registered", success : true})
        })
        .catch(function(err){
            res.status(500).json({message : "Failed", success : false})
        })
    })


})




router.post('/accountant/login', function(req, res){
    const accountantEmailAddress = req.body.accountantEmailAddress
    const accountantPassword = req.body.accountantPassword

    Accountant.findOne({accountantEmailAddress : accountantEmailAddress})
    .then(function(accountantData){
        if(accountantData === null){
            console.log('wrong email')
            return res.status(401).json({success : false, message : "Invalid credentials"})
        }

        bcryptjs.compare(accountantPassword, accountantData.accountantPassword, function(err, res1){
            if(res1 === false){
                console.log('wrong credentials')
                return res.status(401).json({success : false, message : "Invalid credentials"})
            }

            else{
                console.log('logged in')

                const token = jwt.sign({accountantID : accountantData._id}, 'secretkey')

                res.status(200).json({success : true, message : "Auth success", token : token, user : "Accountant"})
            }
        })
        
    })
})


router.get('/my-profile', auth.isAccountantLoggedIn, function(req, res)
{
    console.log('url hitted');
    const id = req.acInfo._id
    Accountant.findOne({_id:id})
    .then(function(data)
    {
        res.status(200).json(data)
    })
    .catch(function(e)
    {
        res.status(500).json({error:e})
    })
})




router.delete('/accountant/delete', auth.isAccountantLoggedIn, function (req, res) {
    console.log('delete url hitted');
    const accountantID = req.acInfo._id

    Accountant.deleteOne({ _id: accountantID }).then(function (res) {
        res.status(200).json({ message: "Accountant data successfully deleted", success: true })
    })
        .catch(function (error) {
            res.status(500).json({ message: error, success: false })
        })
})





router.put('/accountant/update', auth.isAccountantLoggedIn, upload.single('accountantImage'), function (req, res) {
    const id = req.acInfo._id
    const accountantFname = req.body.accountantFname
    const accountantLname = req.body.accountantLname
    const accountantEmailAdress = req.body.accountantEmailAdress
    const accountantExperience = req.body.accountantExperience
    const accountantImage = req.body.accountantImage
    const pricePerDay = req.body.pricePerDay

    Accountant.updateOne({ _id: id }, {
        accountantFname: accountantFname,
        accountantLname: accountantLname, accountantEmailAdress: accountantEmailAdress,
        accountantExperience: accountantExperience, accountantImage: accountantImage,
        pricePerDay: pricePerDay
    })
        .then(function (/*result*/) {
            res.status(200).json({ message: "Accountant data successfully updated", status: "true", success: true })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
})








router.get('/accountant/all',  function (req, res) {
    console.log('url hitted');
    Accountant.find().then(function (data) {
        res.status(200).json({success : true, data})

        console.log(data)
    })
    .catch(function (e) {
        res.status(500).json({ error: e, success:false })
    })
})




router.get('/accountant/one/:id', function (req, res) {
    const id = req.params.id
    Accountant.findOne({ _id: id }).then(function (data) {
        res.status(200).json({ success: true, data })
    })
        .catch(function (e) {
            res.status(500).json({ success: false, error: e })
        })
})

module.exports = router