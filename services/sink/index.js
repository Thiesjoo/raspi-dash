module.exports = async function (con, http) {
    db = await require("../database/device-registry-db")(con)

    const io = require("socket.io")(http)
    let cache = {}; // Store last insert, last inserted value for each sensor


    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("init", async (data, ack) => {
            try {

                if (data.id && socket.id) {
                    let found = Object.entries(cache).find(x => x[1].id == data.id);
                    if (found) {
                        delete cache[found[0]]
                        console.log("ID ALREADY USED")
                    }

                    const dbDevice = await db.getDevice(data.id)
                    if (!dbDevice) {
                        console.log("Device id not found :(")
                        ack(false)
                        return
                    }
                    let ownCollection = con.collection(data.id)

                    cache[socket.id] = { device: dbDevice, ownCollection, id: data.id, online: true, lastMessage: "", lastTime: Date.now() - 3600 };
                    ack(true)
                } else {
                    console.error("Someone is hacking us!")
                    ack(false)
                }
            } catch (error) {
                console.error("Something went wrong in the socket.on('init')", error);
                ack(false)
            }
        })

        socket.on("data", async (data, ack) => {
            try {
                if (cache[socket.id]) {
                    let cached = cache[socket.id]
                    cached.lastMessage = data
                    cached.lastTime = Date.now();
                    //Check formatting
                    /**
                     {
        "type": "realtime",
        "timeStart": "<start time>",
        "timeEnd": "<start time> + 3600", // An hour of data,
        "precision": "60",
        "samples": [
            {"val": "50,3", "time":1535530412 }
            // List of maximum 1440 samples. (24*60)
        ]
    }
                     */
                    
                    
                    let result = await cached.ownCollection.updateONe({}, 
                        {
                        $set: {
                            type: "realtime"
                        }

                    });
                    if (!result.result.ok) throw new Error("MONGODB Returned 0")

                    console.log("Received", data, "from ", socket.id)





                    ack(true)
                } else {
                    ack(false)
                }
            } catch (error) {
                console.error("Something went wrong in the socket.on('data')", error);
                ack(false)
            }
        })


        socket.on("testing", async (data, ack) => {
            try {

                let result = await con.collection("test").aggregate([
                    // { $match: { data: "testing" } },
                    { $group: { _id: "", amount: { $avg: "$amount" } } },
                
                ]).toArray()

                console.log(result)
                ack(true)
            } catch (error) {
                console.error("Something went wrong in the socket.on('testing')", error);
                ack(false)
            }
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


    });

};
