const express = require('express')
const path = require('path')
let app = express()
let authRoutes = require('./routes/auth.route')
let database = require('./data/database')

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(authRoutes)

database.connectToDatabase().then(function(){
    app.listen(3000)

}).catch(function(error){
    console.log('failed to connect')
    console.log(error)

})
