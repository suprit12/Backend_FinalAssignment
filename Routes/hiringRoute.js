const express = require('express')

const router = express.Router()

const HireAccountants = require('../Models/hiringModel')

const bcryptjs = require('bcryptjs')


const auth = require('../Middleware/auth')

const upload = require('../Middleware/upload')

const jwt = require('jsonwebtoken')
const Accountant = require('../Models/accounts')


router.post('/user/hireAccountant/:accountantID', auth.isUserLoggedIn, function(req, res){

    console.log('hello')


    const userID = req.userInfo._id
    const accountantID = req.params.accountantID
    const endDate = req.body.endDate


    const newContract = new HireAccountants({endDate : endDate,userID: userID,
         accountantID : accountantID})
         

         newContract.save().then(function(result){
             console.log(result)
             res.status(200).json({success : true, message : "Successfully hired"})
         })
         .catch(function(err){
             res.status(500).json({succcess : false, messag : "fail hiring"})
         })

})




router.get('/user/getMyAccountants', auth.isUserLoggedIn, function(req, res){
    console.log('url hitted');
    const userID = req.userInfo._id

    console.log(userID)

    HireAccountants.find({userID: userID}).populate({"path":"accountantID"}).then(function(hireData){
        console.log('hello', hireData)
        res.status(200).json({success : true, hireData})
    })
    .catch(function(e){
        res.status(500).json({success : false, error : e})
    })
})


router.delete('/delete/hirings/:id', auth.isUserLoggedIn, function(req,res)
{
    const id = req.params.id

    HireAccountants.deleteOne({_id:id})
    .then (function(result)
    {
        res.status(200).json({message:"hiring deleted success", success:true})
    })
    .catch(function(err)
    {
        res.status(500).json({message:err, success:false})
    })
})


module.exports = router