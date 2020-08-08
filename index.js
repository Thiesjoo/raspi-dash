const express =  require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const sensor = require('ds18b20-raspi');

app.use(express.json())


const services = require("./services")(app)
const databaseService = services.database;
databaseService.init(app);

app.use(function (err, req, res, next) {
  console.error(err)
  res.status(err.status).send({msg: err.message})
})

//TEMP
let db = null;

const interval = 1; //Seconds
let lastTemp = 0;
app.get("/all", async (req, res, next) => {
  try {
    res.json(await db.find({}))
  } catch (err) {
    next(err)
  }
})
app.get("/delete", async (req, res, next) => {
  try {
    res.json(await db.remove({}, { multi: true },))
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

// /temp

app.on("ready", () => {
  //TODO: Remove this
  db = databaseService.getMongoDB()
  http.listen(3000, () => {
    console.log('listening on *:3000');
  });
});