const checkIdWithoutDB = async (db, id, yes) => {
    if (!id ) return Promise.reject("No id specified")
    let device = await db.getDevice(id)
    if (device) {
        return yes ? true : Promise.reject("Device id is already in use")
    }
    return yes ? Promise.reject("Device not found") : true
}

const checkType = (type) => {
    if (config.types.includes(type)) return true;
    throw new Error("Not a valid type")
}

module.exports = {checkIdWithoutDB, checkType}