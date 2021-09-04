const mongoose = require('mongoose')
const Accountant = require('../Models/accounts')

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

describe("Testing accountant schema", () => {
    it("Checking if accountant registration works", () => {
        const accountant = {
            'accountantFName' : 'Mukesh',
            'accountantLName' : "Ambani",
            "accountantEmailAddress" : "reliance123@gmail.com",
            "accountantDOB" : "1988-2-1",
            "gender" : "Male",
            "accountantExperience" : 5,
            "accountantPassword" : "password123",
            "pricePerDay" : 300
        }
        return Accountant.create(accountant)
        .then((result) => {
            expect(result.accountantFName).toEqual('Mukesh')
        })
    })

    it("Checking if accountant data can be updated", async () => {
        return Accountant.findOneAndUpdate({_id : Object('607eb95459fae621c4613532')}
        , {$set : {accountantFName : "Jimmy"}})
        .then((ac) => {
            expect(ac.accountantFName).toEqual('Jimmy')
        })
    } )

    it("Checking if accountant data can be deleted", async () => {
        const status = await Accountant.deleteOne()
        expect(status.ok).toBe(1)
    })
    

})