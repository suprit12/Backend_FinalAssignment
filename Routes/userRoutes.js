const express = require('express')

const User = require('../Models/users')

const router = express.Router()
 
const {check, validationResult} = require('express-validator')

const bcryptjs = require('bcryptjs')

const bodyParser = require('body-parser')

const auth = require('../Middleware/auth')

const jwt =  require('jsonwebtoken')

const upload = require('../Middleware/upload')

const cors = require('cors')
const { response } = require('express')
const { route } = require('./hiringRoute')


router.post('/register',  upload.single('userImage'),  function(req, res){

    const errors = validationResult(req);

    console.log('file uploading console', req.file);


    if(errors.isEmpty()){

     const fName = req.body.fName
     const lName = req.body.lName
     const emailAddress = req.body.emailAddress
     const address = req.body.address
     const dob = req.body.dateOfBirth
     const gender = req.body.gender
     const password = req.body.password
     const mobileNo = req.body.mobileNo
     const organization = req.body.organization
     const userImage = req.file.path
    
     


     bcryptjs.hash(password, 10, function(err, hash){
        const newUser = new User({fName : fName, lName : lName, emailAddress : emailAddress,
             address : address, dateOfBirth : dob, gender : gender, organization : organization, mobileNo : mobileNo,
         password : hash, userImage : userImage})


        newUser.save()
        .then(function(result){
            console.log("result", result)
            res.status(200).json({message : "Registered", success : true})
        })
        .catch(function(err){
           res.status(500).json({message:"register failed", success:false})
        })
     })

    }
    else{
        res.json(400).send(errors.array())
    }

 
})

router.post('/user/login', function(req, res){
    const emailAddress = req.body.emailAddress
    const password = req.body.password

    //finding if the email address exists

    User.findOne({ emailAddress : emailAddress })
    .then(function(userData){
        if(userData === null){
            //means useranme doesn't exist

            return res.status(403).json({success : false , message : "Invalid crendentials"})
        }

        //if username is correct

        bcryptjs.compare(password, userData.password, function(err, res1){
            if(res1 === false){
                console.log("wrong credentials")
                return res.status(403).json({success : false, message : "Invalid crendentials"})
            }

            else{
            console.log("Logged in")

            const token = jwt.sign({userID : userData._id}, 'secretkey')

            res.status(200).json({
                success : true,
                message : "Auth success",
                token : token,
                user:"User",
                data:[userData]
            })
        }
        })
    })
    .catch()
})

router.put('/user/uploadImage/:id', upload.single('userImage'), function(req, res){
    const id = req.params.id

    const userImage = req.file.filename

    User.updateOne({_id : id}, {
        userImage : userImage
    })
    .then(function(){
        res.status(200).json({success : true, message : "Updated"})
    })
    .catch(function(e){
        res.status(500).json(e)
    })
})

module.exports = router