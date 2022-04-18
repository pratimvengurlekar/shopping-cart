const express = require('express')
let app = express()
let authRoutes = require('./routes/auth.route')

app.use(authRoutes)
app.listen(3000)