let User = require('../models/user.model')
let authUtils = require('../utils/authentication')
let validationUtils = require('../utils/validation')
let sessionflash = require('../utils/session-flash')
const sessionFlash = require('../utils/session-flash')
function signin(req,res){
    let sessiondata = sessionFlash.getSessionData(req)
    if(!sessiondata){
        sessiondata = {
            email: '',
            confirmEmail: '',
           password:  '',
           fullname:  '',
           street:  '',
            postal:'',
           city: ''

        }
    }
    res.render('./customer/auth/signup',{inputdata: sessiondata})

}

async function signup(req, res,next){
    const entereddata = {
       email: req.body.email,
       confirmEmail: req.body['confirm-email'],
      password:  req.body.password,
      fullname:  req.body.fullname,
      street:  req.body.street,
       postal: req.body.postal,
      city:  req.body.city
    }

    let user = new User(req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city)

       if( !validationUtils.userDetailsAreValid(req.body.email, req.body.password, req.body.fullname,
            req.body.street,
            req.body.postal,
            req.body.city) || !validationUtils.emailIsConfirmed(req.body.email, req.body['confirm-email'])){
                sessionflash.flashDataToSession(req,{
                    errorMessage:"Please check input. The password is 6 chrs long",
                    ...entereddata
                },function(){
                    res.redirect('/signup')

                })
                
                return
            }

           

        try{

            let userExistAlready = await user.userNameExists()
            if(userExistAlready){
                sessionflash.flashDataToSession(req,{
                    errorMessage: 'The username email already exists',
                    ...entereddata
                },function(){
                    res.redirect('/signup')

                })
                return
            }
            await user.signup()
        }catch(error){

            next(error)
            return

        }

        res.redirect('/login')



}

function getlogin(req,res){

    let sessiondata = sessionFlash.getSessionData(req)
    if(!sessiondata){
        sessiondata = {
            email: '',
            password:  ''
        }
    }
    

    res.render('./customer/auth/login',{inputdata: sessiondata})

}

async function login(req,res,next){
    entereddata = {
        email: req.body.email,
        password: req.body.password

    }
    let user = new User(req.body.email,req.body.password)
    let existingUser
    try {
        
        existingUser = await user.getUserwithSameUsername()
    } catch (error) {
        next(error)
        return
        
    }
    if(!existingUser){
        sessionFlash.flashDataToSession(req,{
            errorMessage: 'Username email doesnot exist',
            ...entereddata

        }, function(){
            res.redirect('/login')

        })
        return
    }

    let isMatchingPassword

    try{

        isMatchingPassword = await user.hasMatchingPssword(existingUser.pasword)
    }
    catch(error){
        next(error)
        return
    }


    if(!isMatchingPassword){
        sessionFlash.flashDataToSession(req,{
            errorMessage: 'Password do not match',
            ...entereddata
        })
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