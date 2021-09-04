const mongoose = require('mongoose')
const User = require('./users')

const Comments = mongoose.model('Comments', {
    
    userID : {
        type : mongoose.Types.ObjectId, ref:'User'
    },

    accountantID :{
        type:mongoose.Types.ObjectId, ref:'Accountant'
    },

    commentDate : {
        type : Date,
        default : Date.now()
    },

    comment : {
        type : String
    }
})

module.exports = Comments