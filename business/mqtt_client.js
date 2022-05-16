var mqtt = require("mqtt");
const helmet = require("../persistance/helmet");
const mqtt_config = require("./config.json").mqtt;
const io = require("socket.io-client");
const { Socket } = require("socket.io");

// json type check function
function IsJsonString(str) {
  try {
    var json = JSON.parse(str);
    return typeof json === "object";
  } catch (e) {
    return false;
  }
}

// mqtt options
var options = {
  host: mqtt_config.host,
  port: mqtt_config.port,
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  username: mqtt_config.username,
  password: mqtt_config.password,
  keepalive: 60,
  reconnectPeriod: 1000,
  encoding: "utf8",
};

var client = mqtt.connect(options);

var socket = io("http://localhost:3000");

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
client.on("message", function (topic, message, packet) {
  let date = new Date();

  console.log("----------new message----------");
  console.log(date.toLocaleString());
  if (IsJsonString(message) == true) {
    let msg_json = JSON.parse(message);

    let sensors = msg_json.sensor;

    let raw_data = {
      helmet_id: 3, //msg_json.helmet_id,
      temp: sensors.dht.temp,
      humid: sensors.dht.humid,
      photoresistor: sensors.photoresitor,
      latitude: sensors.gps.latitude,
      longitude: sensors.gps.longitude,
      distance: sensors.distance,
      shock: sensors.shock,
      worker_danger: msg_json.worker_danger,
    };

    socket.emit("msg", raw_data);
    helmet.uploadData(raw_data);
    console.log(msg_json);
  } else {
    console.log("topic : " + topic + "\nmessage : " + message.toString());
  }
});

// Log when error occered
client.on("error", function (err) {
  console.log(err);
});
