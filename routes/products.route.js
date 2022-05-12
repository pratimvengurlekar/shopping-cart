const express = require('express')
let productController = require('../controllers/product.controller')
let routes = express.Router()



routes.get('/products', productController.getAllProducts)
routes.get('/products/:id', productController.getProductDetails)


module.exports = routes