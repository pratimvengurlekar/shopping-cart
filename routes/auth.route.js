const express = require('express')
let routes = express.Router()
let authController = require('../controllers/auth.controller')


routes.get('/signin', authController.getSignup)

routes.get('/login', authController.getLogin)


module.exports = routes