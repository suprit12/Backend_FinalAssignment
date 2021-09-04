const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const db = require('./Database/db')

const userRoute = require('./Routes/userRoutes')
const acRoute = require('./Routes/accountantRoute')
const hiringRoute = require('./Routes/hiringRoute')
const publicDirectory = path.join(__dirname, "")

const commentRoute = require('./Routes/commentRoute')
const auth = require('./Middleware/auth')

const cors = require('cors')



var app = express()
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

app.use(express.json())
app.use(express.static(publicDirectory))


app.use(cors())
app.use(userRoute)
app.use(acRoute)
app.use(commentRoute)


app.use(hiringRoute)

app.listen(9001)

