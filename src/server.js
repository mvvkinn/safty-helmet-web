import express from "express";
import http from "http";
import socketio from "socket.io";
import mqtt_client from "../business/mqtt_cl";
import router from "./route";
import pool from "../persistance/pool";

const app = express();

app.use(express.static(__dirname + "/views"));
app.use("/public", express.static(__dirname + "/public"));

app.use("/", router);

const httpServer = http.createServer(app);
const io = socketio(httpServer);

httpServer.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

const mqtt_option = require("../config/config.json").mqtt;
mqtt_option.clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);
mqtt_client.connectMQTT(mqtt_option);
mqtt_client.subscribeToTopic("helmet");
mqtt_client.callbackOnMessage((topic, msg) => {
  if (isStringJson(msg)) {
    const json = stringToJson(msg);
    const date = new Date();

    json.updated_time = date;

    const sql = `UPDATE helmet SET ? WHERE helmet_id = ${json.helmet_id}`;
    pool.query(sql, json);
    io.emit("helmetMsg", stringToJson(msg));
  } else {
    io.emit("msg", msg);
  }
});

io.on("connection", function (socket) {
  console.log(socket.id, " connected");

  socket.on("helmetMsg", data => {
    console.log(socket.id, data);
  });
  socket.on("msg", function (data) {
    socket.emit("msg", data);
    console.log(socket.id, data);

    done();
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

function isStringJson(str) {
  try {
    var json = JSON.parse(str);
    return typeof json === "object";
  } catch (e) {
    return false;
  }
}
