const express = require('express')
const path = require('path')
const csrf = require('csurf')
const expressSession = require('express-session')
let app = express()
let authRoutes = require('./routes/auth.route')
let baseRoutes = require('./routes/base.route')
let productRoutes = require('./routes/products.route')
let adminRoutes = require('./routes/admin.route')

let database = require('./data/database')
let csrfMiddleware = require('./midddlewares/csrf-token')
let errorMiddleware = require('./midddlewares/error-handle')
let checkauthMiddleware = require('./midddlewares/check-auth')
let expressSessionConfig = require('./config/session')

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static('public'))
app.use('/products/assets',express.static('product-data'))
app.use(express.urlencoded({extended: false}))
let sessionConfig = expressSessionConfig()
app.use(expressSession(sessionConfig))
app.use(csrf())
app.use(csrfMiddleware)
app.use(checkauthMiddleware)

app.use(baseRoutes)
app.use(authRoutes)
app.use(productRoutes)
app.use('/admin',adminRoutes)
app.use(errorMiddleware)

database.connectToDatabase().then(function(){
    app.listen(3000)

}).catch(function(error){
    console.log('failed to connect')
    console.log(error)

})
