function checkAuthStatus(req, res, next){
    let uid = req.session.uid

    if(!uid){
        return next()
    }

    res.locals.uid = uid
    res.locals.isAuth = true
    res.locals.isAdmin = req.session.isAdmin
    next()
}

module.exports = checkAuthStatus