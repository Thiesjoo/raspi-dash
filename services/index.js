module.exports = async function (app, http) {
    try {

        const database = await require("./database").init()

        await require("./sink")(database, http)

        app.use('/api/registry', await require("./device-registry")(database))
        app.use('/', require("./web-server"))


        app.emit("ready")

    } catch (error) {
       console.error("Couldn't initialize services",error)
       process.exit()
    }
}