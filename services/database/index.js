// const mongoRequire = require('mongodb')
// const mongoClient = mongoRequire.MongoClient;
// const mongoUrl = config.mongoURL;

let mongoDb = null
const Datastore = require('nedb-promises')
const createError = require('http-errors')

function init(app) {
    return connectToMongo()
        .then(result => {
            app.emit("ready")
            return result
        })
        .catch(error => {
            throw error
        })
}

async function connectToMongo() {
    try {
        // console.log("Trying to connect to database with url: ", mongoUrl)
        // let newCon = await mongoClient.connect(mongoUrl,
            // { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 5000, socketTimeoutMS: 5000,serverSelectionTimeoutMS: 5000 })
        // mongoDb = await newCon.db(config.databaseName)

        mongoDb = Datastore.create('../../db/sensors.db');

        console.log("CONNECTED/CREATED DB!")
        return mongoDb
    } catch (error) {
        throw error
    }
}

function getMongoDB() {
    return mongoDb
}


async function getDevice(id) {
    // return null;
    throw createError(404, `Device with ${id} was not found`)
}


module.exports = {
    init,
    getMongoDB,
    
    getDevice
}