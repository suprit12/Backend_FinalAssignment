const mongoose = require('mongoose')

const User = require('../Models/users')

const url = 'mongodb://localhost:27017/HireAccounts'

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser : true,
        useCreateIndex : true
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe("Testing user schema", () => {
    it("Checking if registration works", () => {
        const user = {
            'fName' : 'John',
            'lName' : 'Doe',
            'emailAddress' : 'johnDoe2123123@gmail.com',
            'dateOfBirth' : '1999-10-10',
            'address' : 'Baluwatar',
            'gender' : 'Male',
            'password' : 'password123',
            'pricePerDay' : 3000
        }
        return User.create(user)
        .then((result) => {
            expect(result.fName).toEqual('John')
        })
    })

    it("Checking if user data can successfully deleted", async () => {
        const status = await User.deleteOne()
        expect(status.ok).toBe(1)
    } )
    

})