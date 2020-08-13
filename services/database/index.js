const config = require('../../config')

const mongoRequire = require('mongodb')
const mongoClient = mongoRequire.MongoClient;
const mongoUrl = config.mongoURL;

async function init() {
    console.log("Trying to connect to database")
    let newCon = await mongoClient.connect(mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 5000, socketTimeoutMS: 5000,serverSelectionTimeoutMS: 5000 })
    mongoDb = await newCon.db(config.databaseName)

    return mongoDb
}

module.exports = {
    init,
}