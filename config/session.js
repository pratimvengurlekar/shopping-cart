const mongodbsession = require('connect-mongodb-session')
const expressSession = require('express-session')

function createSessionStore(){
   let sessionStore = mongodbsession(expressSession)
   let store = new sessionStore({
       uri: 'mongodb://localhost:27017',
       databaseName: 'online-shop',
       collection: 'sessions'
   })
   return store
}

function createSessionConfig(){
    return {
        secret: 'super-save',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    }
}

module.exports = createSessionConfig