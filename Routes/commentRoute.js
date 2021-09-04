const express = require('express')

const router = express.Router()

const Comment = require('../Models/comments')

const auth = require('../Middleware/auth')

router.post('/accountant/addComment/:id', auth.isUserLoggedIn, function(req, res){


    const userID = req.userInfo._id

    const accountantID = req.params.id

    const comment = req.body.comment

    const addComment = new Comment({userID : userID,  accountantID : accountantID, 
        comment : comment})

    addComment.save()
    .then(function(){
        res.status(200).json({success : true, message : "Successfully added comment"})
    })
    .catch(function(err){
        res.status(500).json({success : false, message : err.response})
    })

})



router.get('/all-comments/:id', function(req, res)
{
    console.log('url hitted');
    
    const accountantID = req.params.id

    Comment.find({accountantID:accountantID}).populate('userID')
    . then(function(data){
        res.status(200).json({data, success:true})
        // console.log('data log',data)
    })
    .catch(function(e){
        res.status(500).json({error : e, success:false})
    })
})




router.get('/accountant/comments/:id', auth.isUserLoggedIn, function(req, res){
    const commenterID = req.userInfo._id
    const accountantID = req.params.id

    Comment.find({accountantID : accountantID}).populate({"path" : "CommenterID"}).then(function(commentData){
        console.log(commentData)

        res.status(200).json({successs : true, commentData})
    })
    .catch(function(err){
        res.status(500).json({success : false, err})
    })
})





router.get('/accountant/comments/myComments/:id', auth.isUserLoggedIn, function(req, res){
    const commenterID = req.userInfo._id
    const accountantID = req.params.id

    Comment.find({ $and : [{accountantID : accountantID}, {commenterID : commenterID}] }).populate({"path" : "CommenterID"}).then(function(commentData){
        console.log(commentData)

        res.status(200).json({success : true, commentData})


    })
    .catch(function(err){
        res.status(500).json({success : false, err})
    })
})

router.get('/accountant/comments/otherComments/:id', auth.isUserLoggedIn, function(req, res){
    const commenterID = req.userInfo._id
    const accountantID = req.params.id

    Comment.find({accountantID : accountantID, commenterID : {$ne : commenterID}}).populate({"path" : "CommenterID"})
    .then(function(commentData){
        console.log(commentData)

        res.status(200).json({success : true, commentData})
    })

    .catch(function(err){
        res.status(500).json({success : false, err})
    })
})



router.put('/accountant/comments/myComments/update/:id', auth.isUserLoggedIn, function(req, res){
    const id = req.userInfo._id

    Comment.updateOne({commenterID : commenterID}, {})
})

module.exports = router