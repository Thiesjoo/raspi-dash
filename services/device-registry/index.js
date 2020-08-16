const router = require('express').Router();
const ash = require("express-async-handler")
const { body, param, check } = require('express-validator');

const { errorHandler } = require("../../helper");
const { checkIdWithoutDB, checkType } = require('./internal_helper');

let db;

const checkId = (id, yes) => { return checkIdWithoutDB(db, id, yes) }


router.get('/devices', ash(async function (req, res) {
    res.send(await db.getDevices())
}));

router.post('/devices', [
    body("id")
        .custom(id => checkId(id, false)),
    body("label").isLength({ min: 3 }),
    body("gateway").isIP(),
    check("type.type", "A device type is required").custom(checkType),
    check("type.unit").isString(),
], errorHandler, ash(async function (req, res) {

    res.status(201).json(await db.createDevice(req))
}));


router.get("/devices/:id", [
    param("id")
        .custom(id => checkId(id, true)),
], errorHandler, ash(async function (req, res) {
    let id = req.params.id;

    let device = await db.getDevice(id);
    if (!device) throw new Error("Device not found")
    res.json(device)
}));

router.put("/devices/:id", [
    body("id").isEmpty(), // Cannot reassign ID;
    body("label").isLength({ min: 3 }),
    body("gateway").isIP(),
    check("type.type", "A device type is required").custom(checkType),
    check("type.unit").isString(),
], errorHandler, ash(async function (req, res) {
    let id = req.params.id
    let device = await db.getDevice(id);
    if (device) {
        res.json(await db.updateDevice(id, req));
    } else {
        req.body.id = id;
        res.status(201).json({ data: await db.createDevice(req) })
    }
}));

router.delete(['/devices/', "/devices/:id"], [

], errorHandler, ash(async function (req, res) {
    let id = req.params.id || req.body.id;
    await checkId(id, true)


    await db.deleteDevice(id)
    res.status(204).json({ ok: true });
}));



module.exports = async function (con) {
    db = await require("../database/device-registry-db")(con)
    return router
};
