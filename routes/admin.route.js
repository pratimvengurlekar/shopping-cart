const express = require('express')
let routes = express.Router()

let adminController = require('../controllers/admin.controller')
let multerMiddleware = require('../midddlewares/image-upload')

routes.get('/products', adminController.getProducts)
routes.get('/products/new', adminController.getNewProduct)
routes.post('/products',multerMiddleware, adminController.createNewProduct)
routes.get('/products/:id', adminController.getUpdateProduct)
routes.post('/products/:id',multerMiddleware, adminController.updateProduct)
routes.delete('/products/:id',adminController.deleteProduct)




module.exports = routes