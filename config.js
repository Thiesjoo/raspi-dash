require('dotenv').config()

let url = ""
if ( process.env.MONGOURL) {
    url = process.env.MONGOURL
} else {
    let ip = "localhost"
    url = `mongodb://${ip}:27017/`
}

const production = process.env.NODE_ENV == "production" ? true : false

module.exports = {
    production,
    databaseName: production ? "raspi-dash" : "raspi-dash-dev",
    mongoURL: url,
    port: process.env.PORT || 8090,


    types: ["sensor"]
}