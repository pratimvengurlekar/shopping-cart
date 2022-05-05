const mongodb = require('mongodb')
let MongoClient = mongodb.MongoClient

let database;
async function connectToDatabase(){
    let client = await MongoClient.connect('mongodb://localhost:27017')
    database = client.db('online-shop')
}

function getDb(){
    if(!database){
        throw new Error('Connect to database first!!!')
    }
    return database
}   

module.exports = {
    connectToDatabase : connectToDatabase,
    getDb : getDb
}
