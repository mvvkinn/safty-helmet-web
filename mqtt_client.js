var mqtt = require('mqtt');
var mysql = require('mysql');

// mqtt options
var options = {
    host: 'localhost',
    port : 1883,
    clientId : 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username : "",
    password : "",
    keepalive : 60,
    reconnectPeriod : 1000,
    encoding : "utf8"
};

var client = mqtt.connect(options);

// MQTT Connect and subscribe
client.on ("connect",function(options){
    client.subscribe('examples', function(err){
        if (!err){
            client.publish('presense', 'hello mqtt');
        }
    });
    console.log('Server : Connected to MQTT Server');

});

// Message callback
client.on ("message", function(topic, message, packet){
    console.log("----------new message----------");
    console.log("topic : " + topic + "\nmessage : " + message.toString());

});

// Log when error occered
client.on('error', function(err) {
    console.log(err);
});

// MySQL 
var db_conn = mysql.createConnection({
    host: "localhost",
    user: "helmet_admin",
    password: "!helmAdmin",
    database: "testDB",
    port: "3306"
})

db_conn.connect(function(err){
    if (err) {
        throw err;
    } 
    console.log("Server : Database connected");
})


