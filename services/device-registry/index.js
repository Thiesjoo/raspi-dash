const router = require('express').Router();
const ash = require("express-async-handler")
const { body, validationResult } = require('express-validator');

const { getDevice } = require("../database")

const internal = require("../../devices/raspi-sensors/internal")
const errorHandler = require("../../helper").errorHandler

router.post('/devices', [
    body("id").isUUID()
    // .custom(id => {
    //     return getDevice(id).then(device => {
    //         if (device) return Promise.reject("Device id already in use")
    //     })
    // })
    ,
    body("label").isLength({ min: 3 }),
    body("gateway").isIP(),
    body("type").custom(type => {
        if (!type) throw new Error("Not a valid type")
        return true
    })
], errorHandler, ash(async function (req, res) {
    console.log("handling request")

    let { id, label, gateway, type } = req.body;

    res.send("TODO")
}));

router.get('/devices', ash(async function (req, res) {
    // Read device

    res.send(await internal.getCPUTemp());
}));

router.get('/devices/:id', [
    body("id").isString()
], errorHandler, ash(async function (req, res) {
    let id = req.params.id;

    // Read device
    console.log("wtf", req.params)

    res.send(await getDevice());
}));

// 28-0215011c09ff

router.put('/devices/:id', ash(async function (req, res) {
    // Update or create an existing device
    res.send('About device');
}));

router.delete('/devices/:id', ash(async function (req, res) {
    console.log(req.params.id)
    // Delete an existing device
    res.json({"yaee": "test"});
}));



module.exports = router;
