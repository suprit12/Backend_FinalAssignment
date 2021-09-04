const mongoose = require('mongoose')
const Accountant = require('./accounts')

 const HireAccountants = mongoose.model('HireAccountant', {
    userID : {
        type : mongoose.Types.ObjectId, ref:'User'
    },

    startDate : {
        type : Date,
        default : Date.now
    },

    accountantID :{
        type:mongoose.Types.ObjectId, ref:'Accountant'
    },

    endDate : {
        type : Date,
        default : Date.now,
        required : true
    }
})

module.exports = HireAccountants