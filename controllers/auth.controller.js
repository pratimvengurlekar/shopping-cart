let User = require('../models/user.model')
let authUtils = require('../utils/authentication')
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

function getlogin(req,res){

    res.render('./customer/auth/login')

}

async function login(req,res){
    let user = new User(req.body.email,req.body.password)
    let existingUser = await user.getUserwithSameUsername()
    if(!existingUser){
        res.redirect('/login')
        return
    }
    let isMatchingPassword = await user.hasMatchingPssword(existingUser.pasword)
    if(!isMatchingPassword){
        res.redirect('/login')
        return

    }

    authUtils.createUserSession(req,existingUser,function(){
        res.redirect('/')

    })
}

function logout(req,res){
    authUtils.destroyUserSession(req)
    res.redirect('/login')
}

module.exports = {
    getSignup: signin,
    getLogin: getlogin,
    signup: signup,
    login: login,
    logout: logout
}