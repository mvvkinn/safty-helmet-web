import mqtt from "mqtt";

let client;

function connectMQTT(options) {
  client = mqtt.connect(options);
  client.on("connect", function (options) {
    console.log("Server : connected to MQTT Server");
  });
}

function subscribeToTopic(topic) {
  client.subscribe(topic, err => {
    if (!err) {
      console.log("subscribed to", topic);
    }
  });
}

function callbackOnMessage(callback) {
  client.on("message", function (topic, message, packet) {
    callback(topic, message);
  });
}

module.exports.connectMQTT = connectMQTT;
module.exports.subscribeToTopic = subscribeToTopic;
module.exports.callbackOnMessage = callbackOnMessage;
