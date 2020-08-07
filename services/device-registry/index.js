const router = require('express').Router();
const ash = require("express-async-handler")

const internal = require("../../devices/raspi-sensors/internal")

router.post('/devices', ash(async function (req, res) {
    let id; // Sensor id,
    let label; // Friendly name
    let gateway; // Ip to contact for data;
    let type; //Object with data: {type: sensor, unit: "C", }
    // Create a new device
    res.send("post")
}));

router.get('/devices', ash(async function (req, res) {
    // Read device

    res.send(await internal.getCPUTemp());
}));

router.get('/devices/:id', ash(async function (req, res) {
    let id = req.params.id;

    // Read device
    console.log("wtf", req.params)

    res.send(await internal.getCPUTemp());
}));

// 28-0215011c09ff

router.put('/devices/:id', ash(async function (req, res) {
    // Update an existing device
    res.send('About device');
}));

router.delete('/devices/:id', ash(async function (req, res) {
    // Delete an existing device
    res.send('About device');
}));



module.exports = router;
