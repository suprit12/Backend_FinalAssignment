const mongoose = require('mongoose')

const Accountant = mongoose.model('Accountant', {
    accountantFName : {
        type : String,
        required : true
    },
    accountantLName : {
        type : String,
        required : true
    },
    accountantEmailAddress : {
        type : String,
        required : true,
        unique : true
    },

    accountantDOB : {
        type : Date
    },

    gender : {
        type : String
    },

    accountantExperience : {
        type : Number
    },

    accountantMobNo : {
        type : Number
    },

    accountantImage : {
        type : String
    },

    accountantPassword : {
        type : String,
        required : true

    },

    pricePerDay : {
        type : Number,
        required : true
    }
})

module.exports = Accountant