let db = null;

async function getDevices() {
    return await db.find({}).toArray()
}

async function getDevice(id) {
    let result = await db.findOne({ id })
    return result
}

async function createDevice(req) {
    let standard = { status: "offline", "lastSeen": Date.now() }
    let result = await db.insertOne({ id, label, gateway, type, standard } = req.body,)
    return result.ops[0]
}

async function deleteDevice(id) {
    let result = await db.deleteOne({ id });
    if (!result.result.ok) throw new Error("Device could not be deleted")
}

async function updateDevice(id, req) {
    let result = await db.updateOne({ id }, { $set: { ...{id, label, gateway, type} = req.body } })
    //TODO: Return new object
    return {}
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