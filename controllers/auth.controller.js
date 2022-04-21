let User = require('../models/user.model')
function signin(req,res){
    res.render('./customer/auth/signup')

}

async function signup(req, res){

    let user = new User(req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city)
    await user.signup()

        res.redirect('/login')



}

function login(req,res){

    res.render('./customer/auth/login')

}

module.exports = {
    getSignup: signin,
    getLogin: login,
    signup: signup
}