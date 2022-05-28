import express from "express";
import http from "http";
import socketio from "socket.io";
const helmet = require("../persistance/helmet");
import mqtt_client from "../business/mqtt_cl";

const app = express();

app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => res.sendFile("index.html"));
app.get("/getHelmetData", function (req, res) {
  helmet.readDataFromHelmetId(3).then(data => {
    res.json(data);
  });
});

const httpServer = http.createServer(app);
const io = socketio(httpServer);

httpServer.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

const mqtt_option = require("../business/config.json").mqtt;
mqtt_option.clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);
mqtt_client.connectMQTT(mqtt_option);
mqtt_client.subscribeToTopic("helmet");
mqtt_client.callbackOnMessage((topic, msg) => {
  io.emit("msg", stringToJson(msg));
});

io.on("connection", function (socket) {
  console.log(socket.id, " connected");

  socket.on("msg", function (data) {
    socket.emit("msg", data);
    console.log(socket.id, data);
  });
});

function stringToJson(str) {
  try {
    var json = JSON.parse(str);
    return json;
  } catch (e) {
    return str;
  }
}
