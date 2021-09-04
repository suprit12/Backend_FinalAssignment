
const mongoose = require('mongoose')

const User = mongoose.model('User', {
    fName : {
    type : String,
       required : true},

    lName : {
        type : String,
        required : true},

    emailAddress : {
        type : String,
        required : true,
        unique : true},

    dateOfBirth : {
        type : Date},

    address : {
        type : String},

    gender : {
        type : String},

    organization : {
        type : String},

    mobileNo : {
        type : String},

    password : {
        type : String,
        required : true},

    userImage : {
        type : String,
        default:"1617723159196maxresdefault.jpg"}
})

module.exports = User