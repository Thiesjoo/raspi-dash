const config = require('../../config')

const mongoRequire = require('mongodb')
const mongoClient = mongoRequire.MongoClient;
const mongoUrl = config.mongoURL;

// const Datastore = require('nedb-promises')


async function init() {
    console.log("Trying to connect to database with url: ", mongoUrl)
    let newCon = await mongoClient.connect(mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 5000, socketTimeoutMS: 5000,serverSelectionTimeoutMS: 5000 })
    mongoDb = await newCon.db(config.databaseName)

    // mongoDb = Datastore.create('db/sensors.db');
    // let newCon = {db: Datastore.create}


    console.log("CONNECTED/CREATED DB!")
    return mongoDb
}




module.exports = {
    init,
}