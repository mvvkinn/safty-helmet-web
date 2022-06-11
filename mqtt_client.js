const mqtt = require("mqtt");
const options = require("./config/config.json").mqtt;
const io = require("socket.io-client");
const pool = require("./controller/pool");

options.clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);

var client = mqtt.connect(options);
var socket = io("http://localhost:3000/");

// MQTT Connect and subscribe
client.on("connect", function (options) {
  client.subscribe("helmet", function (err) {
    // functions when connected
    if (!err) {
    }
  });
  console.log("Server : Connected to MQTT Server");
});

// Message callback
client.on("message", function (topic, msg, packet) {
  if (isStringJson(msg)) {
    const json = stringToJson(msg);
    const date = new Date();

    json.updated_time = date;

    const sql = `UPDATE helmet SET ? WHERE helmet_id = ${json.helmet_id}`;
    pool.query(sql, json);

    socket.emit("helmetMsg", json);
    console.log(json);
  } else {
    socket.emit("msg", msg);
    console.log();
  }
});

socket.on("helmetMsg", data => {
  console.log(data);
});

// Log when error occered
client.on("error", function (err) {
  console.log(err);
});

// json type check function
function isStringJson(str) {
  try {
    var json = JSON.parse(str);
    return typeof json === "object";
  } catch (e) {
    return false;
  }
}

function stringToJson(str) {
  try {
    var json = JSON.parse(str);
    return json;
  } catch (e) {
    return str;
  }
}
