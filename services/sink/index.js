const router = require('express').Router();
const ash = require("express-async-handler")

const internal = require("../../devices/raspi-sensors/internal")

router.post('/sink', function(req, res) {
    let id; // Sensor id,
    //check id 

    //post data to database
    res.send("post")
});

router.get('/', ash(async function(req, res) {
    // Read device

    res.send(await internal.getCPUTemp());
}));

// 28-0215011c09ff

router.put('/', function(req, res) {
    // Update an existing device
    res.send('About device');
});

router.delete('/', function(req, res) {
    // Delete an existing device
    res.send('About device');
});



module.exports = router;
