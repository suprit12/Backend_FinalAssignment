const jwt = require('jsonwebtoken')

const User = require('../Models/users')
const Accountant = require('../Models/accounts')


// file auth.js
module.exports.isUserLoggedIn = function (req, res, next) {
    console.log('test')
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if (!token) {
        return res.status(401).send('Access denied')

    }
    try {
        const checkUserData = jwt.verify(token, 'secretkey')
        console.log('hello ', checkUserData)
        User.findOne({ _id: checkUserData.userID })
            .then(function (userInfo) {
                // console.log(teacherinfo)
                console.log('user', userInfo)
                req.userInfo = userInfo
                console.log('userinfo', userInfo)
                next()
            })

            .catch(function(err){
              return  res.status(401).json({message : "Invalid data"})
            })


    } catch (err) {
        res.status(500).json({ error: err })
    }

}





module.exports.isAccountantLoggedIn = function (req, res, next) {
    console.log('test')
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if (!token) {
        return res.status(401).send('Access denied')
    }
    try {
        const checkAccountantData = jwt.verify(token, 'secretkey')
        console.log('hello ', checkAccountantData)
        Accountant.findOne({ _id: checkAccountantData.accountantID })
            .then(function(accountantInfo) {
                console.log('accountant', accountantInfo)
                req.acInfo = accountantInfo
                next()
            })

            .catch(function(err){
              return  res.status(401).json({message : "Invalid data"})
            })


    } catch (err) {
        res.status(500).json({ error: err })
    }

}

