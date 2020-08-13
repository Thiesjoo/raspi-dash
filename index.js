const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.json())

const services = require("./services")(app, http)


app.use(function (err, req, res, next) {
  console.error(err)
  res.status(err.status).json({ msg: err.message })
})



app.on("ready", () => {
  http.listen(3000, () => {
    console.log('listening on *:3000');
  });
});