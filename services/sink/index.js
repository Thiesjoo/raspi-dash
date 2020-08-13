module.exports = function (db, http) {
    const io = require("socket.io")(http)
    let cache = {}; // Store last insert, last inserted value for each sensor


    io.on('connection', (socket) => {
        //Set online in database
        console.log('a user connected');

        socket.on("init", (data, ack) => {
            if (data.id && socket.id) {
                let found = Object.entries(cache).find(x=> x[1].id == data.id);
                if (found) {
                    delete cache[found[0]]
                    console.log("ID ALREADY USED")
                }
                //check data.id in database
                cache[socket.id] = { id: data.id, online: true, lastMessage: "", lastTime: Date.now() - 3600 };
                console.log(cache)
                ack(true)
            } else {
                console.error("Someone is hacking us!")
                ack(false)
            }
        })

        socket.on("data", (data, ack) => {
            if (cache[socket.id]) {
                cache[socket.id].lastMessage = data
                cache[socket.id].lastTime = Date.now()

                console.log("Received", data, "from ", socket.id)
                ack(true)
            } else {
                ack(false)
            }
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


    });

};
