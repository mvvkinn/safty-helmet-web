var mqtt = require('mqtt');
var mysql = require('mysql')

var mqtt_options = {
    host: 'mvvkinn.xyz',
    port : 1883,
    clientId : 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username : "mjc",
    password : "mjc1234",
    keepalive : 60,
    reconnectPeriod : 1000,
    encoding : "utf8"
};

var client = mqtt.connect(options);

// Connect and subscribe
client.on ("connect",function(mqtt_options){
    client.subscribe('examples/#', function(err){
        if (!err){
            client.publish('presense', 'hello mqtt');
        }
    });
    console.log('Connected to MQTT Server');

});

client.on ("message", function(topic, message, packet){
    console.log("----------new message----------");
    console.log("topic : " + topic + "\nmessage : " + message.toString());

});

// Log when error occered
client.on('error', function(err) {
    console.log(err);
});