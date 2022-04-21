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

    
}

module.exports = User