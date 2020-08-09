module.exports = async function (app) {
    try {

        const database = await require("./database").init()

        app.use('/api/registry', await require("./device-registry")(database))
        // app.use('/', require("./web-server"))


        // return {}
        app.emit("ready")

    } catch (error) {
       console.error("Couldn't initialize services",error)
       process.exit()
    }
}