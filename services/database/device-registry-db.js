let db = null;

async function getDevices() {
    return await db.find({}).toArray()
}

async function getDevice(id) {
    let result = await db.findOne({ id })
    return result
}

async function createDevice(req) {
    //TODO: Store precision, 
    let result = await db.insertOne({ id, label, gateway, type } = req.body,)
    return result.ops[0]
}

async function deleteDevice(id) {
    let result = await db.deleteOne({ id });
    if (!result.result.ok) throw new Error("Device could not be deleted")
}

async function updateDevice(id, req) {
    let result = await db.findOneAndUpdate({ id }, { $set: { ...{id, label, gateway, type} = req.body } });
    return result.value
}



module.exports = async function (database) {
    db = await database.collection("device-registry");

    return {
            getDevices,
            getDevice,
            createDevice,
            deleteDevice,
            updateDevice
    }
}