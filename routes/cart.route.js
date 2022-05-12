const express = require('express')
let routes = express.Router()

let cartController = require('../controllers/cart.controller')

routes.post('/items', cartController.addCartItem)
routes.get('/', cartController.getCart)
routes.patch('/items',cartController.updateCartItem)

module.exports = routes