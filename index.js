const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require("fs")

const sensor = require('ds18b20-raspi');

var Datastore = require('nedb-promises')
  , db = Datastore.create('db/sensors.db');


const interval = 1; //Seconds
let lastTemp = 0;

app.use(function (err, req, res, next) {
  res.status(400).send('You fucking broke something')
})


app.get('/', (req, res, next) => {
  try {
    let path = __dirname + '/public/index.html';
    if (fs.existsSync(path)) {
      res.sendFile(path)
    } else {
      next("File not found")
    }
  } catch (err) {
    next(error)
  }
});

app.get("/all", async (req, res, next) => {
  try {
    res.json(await db.find({}))
  } catch (err) {
    next(err)
  }
})
app.get("/delete", async (req,res, next) => {
  try {
    res.json(await db.remove({},{ multi: true },))
  } catch (err) {
    next(err)
  }
})


io.on('connection', (socket) => {
  socket.on("get", async (amt) => {
    try {
      let docs = await db.find({});

      let length = amt == 0 ? docs.length : amt
      if (length > docs.length) length = docs.length

      let slice = docs.slice(0, length - 1).reverse();
      io.emit("update", slice);
    } catch (error) {
      throw new Error(error)
    }
  })
  console.log('a user connected');
});

setInterval(async () => {
  try {
    let temp = sensor.readSimpleC(1);
    let send = { time: new Date(), temp };
    if (lastTemp != temp) {
      await db.insert(send)
      lastTemp = temp
      io.emit("change", send)
    }

    io.emit("update", send)
  } catch (err) {
    throw new Error(err)
  }
}, interval * 1000)

http.listen(3000, () => {
  console.log('listening on *:3000');
});