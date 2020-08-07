module.exports = function(app){

    app.use('/api/registry', require("./device-registry"))
    app.use('/', require("./web-server"))

}