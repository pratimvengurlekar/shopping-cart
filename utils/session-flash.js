function getSessionData(req){
    let sessionData = req.session.flasheddata

    req.session.flasheddata = null

    return sessionData
}
function flashDataToSession(req, data, action){
    req.session.flasheddata = data
    req.session.save(action)
}

module.exports = {
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession


}