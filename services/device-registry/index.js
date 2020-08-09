const router = require('express').Router();
const ash = require("express-async-handler")
const { body, param, check } = require('express-validator');

const { errorHandler, config } = require("../../helper")

let internal, db;

const checkId = async (id, yes) => {
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



router.post('/devices', [
    body("id")
        .custom(id => checkId(id, false)),
    body("label").isLength({ min: 3 }),
    body("gateway").isIP(),
    check("type.type", "A device type is required").custom(checkType),
    check("type.unit").isString(),
], errorHandler, ash(async function (req, res) {

    res.json(await db.createDevice(req))
}));

router.get('/devices', ash(async function (req, res) {

    res.send(await db.getDevices())
}));

router.get('/devices/:id', [
    param("id").isString()
], errorHandler, ash(async function (req, res) {

    let id = req.params.id;

    let device = await db.getDevice(id);
    if (!device) throw new Error("Device not found")
    res.send(device)
}));

router.put(['/devices/', "/devices/:id"], [
    body("label").isLength({ min: 3 }),
    body("gateway").isIP(),
    check("type.type", "A device type is required").custom(checkType),
    check("type.unit").isString(),
], errorHandler, ash(async function (req, res) {
    let id = req.params.id || req.body.id;
    await checkId(id, true)
    // FIXME: or create an existing device
    res.json(await db.updateDevice(id, req))
}));

router.delete('/devices/:id', [
    param("id")
        .custom(id => checkId(id, true)),
], errorHandler, ash(async function (req, res) {
    await db.deleteDevice(req.params.id)
    res.json({ok: true});
}));



module.exports = async function (con) {
    internal = await require("./internal")(con)
    db = internal.database
    return router
};
