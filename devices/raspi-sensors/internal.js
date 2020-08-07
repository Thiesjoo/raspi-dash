const sensor = require('ds18b20-raspi');
const { execShellCommand } = require("../../helper")
const tempMatchRegex = /[0-9]*\.[0-9]*/


async function getCPUTemp() {
    let result = await execShellCommand("vcgencmd measure_temp");
    return tempMatchRegex.exec(result)[0]
}

function getTempSensor(id) {
    let temp = sensor.readC(id,2);
    if (!temp) throw new Error("Temperature not found")
    return temp  
}

module.exports =  {
    getTempSensor, getCPUTemp
}