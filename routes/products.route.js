const express = require('express')
let routes = express.Router()



routes.get('/products', function(req,res){
    res.render('customer/products/all-products')
})


module.exports = routes