const express = require('express')
let routes = express.Router()



routes.get('/', function(req,res){
    res.redirect('/products')
})


module.exports = routes