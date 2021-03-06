let bcryptjs = require('bcryptjs')
const database = require('../data/database')
class User {
    constructor(email, password, fullname, street, postalcode, city){
        this.email = email,
        this.password = password,
        this.fullname = fullname,
        this.address = {
            street: street,
            postalcode: postalcode,
            city: city

        }

    }

    async signup(){
        let hashedPassword = await bcryptjs.hash(this.password,12)
        database.getDb().collection('users').insertOne({
            email: this.email,
            pasword: hashedPassword,
            fullname: this.fullname,
            address: this.address

        })


    }

    getUserwithSameUsername(){
       return database.getDb().collection('users').findOne({email : this.email})
    }

    async userNameExists(){
       let existingUser = await this.getUserwithSameUsername()
       if(existingUser){
           return true
       }

       return false
    }

    hasMatchingPssword(hashedPassword){
        return bcryptjs.compare(this.password, hashedPassword)
    }

    
}

module.exports = User