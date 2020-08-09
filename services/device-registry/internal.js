let db = null;

async function getDevices() {
    return await db.find({}).toArray()
}

async function getDevice(id) {
    let result = await db.findOne({id})
    return result
}

async function createDevice(req) {
    let result = await db.insertOne({ id, label, gateway, type } = req.body,)
    return result
}

async function deleteDevice(id) {

}

async function updateDevice(id, updated) {

}



module.exports = async function (database) {
    db = await database.collection("device-registry");

    return {
        database: {
            getDevices,
            getDevice,
            createDevice,
            deleteDevice,
            updateDevice
        },

    }
}