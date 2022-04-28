function checkAuthStatus(req, res, next){
    let uid = req.session.uid

    if(!uid){
        return next()
    }

    res.locals.uid = uid
    res.locals.isAuth = true
    next()
}

module.exports = checkAuthStatus