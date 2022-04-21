const express = require('express')
let routes = express.Router()
let authController = require('../controllers/auth.controller')


routes.get('/signup', authController.getSignup)
routes.post('/signup', authController.signup)

routes.get('/login', authController.getLogin)


module.exports = routes