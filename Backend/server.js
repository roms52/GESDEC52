const serv = {};
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const PORT = process.env.PORT || 8084;    //8080
const server = app.listen(PORT, 'localhost');  //192.168.0.157

const socket = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8083"   //      http://192.168.0.157
  }
})

var corsOptions = {
  origin: "http://localhost:8083"   //      http://192.168.0.157
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

serv.app = app;
serv.socket = socket;
module.exports = serv;



