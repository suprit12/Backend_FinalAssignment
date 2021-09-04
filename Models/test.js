const mongoose = require('mongoose')

const TestModel = mongoose.model('TestCollection', {
    username : {
        type : String,
    },
    phone : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    userType : {
        type : String,
        enum : ['Admin', 'Customer', 'User'],
        default : 'Customer'
    }
})