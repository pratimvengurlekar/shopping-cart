const express = require('express')
let routes = express.Router()



routes.get('/', function(req,res){
    res.redirect('/products')
})

routes.get('/401',function(req, res){
    res.status(401).render('shared/401')
})
routes.get('/403', function(req, res){
    res.status(403).render('shared/403')
})

module.exports = routes