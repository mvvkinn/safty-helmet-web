const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const helmet = require("./persistance/helmet");

const port = 3000;

app.use(express.static("./view"));

http.listen(port, function () {
  console.log("express server running on port " + port);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/chartTest.html");
});

app.get("/userListA", function (req, res) {
  res.sendFile(view_dir + "/userListA.html");
});

app.get("/getChartData", function (req, res) {
  helmet.readDataFromHelmetId(3).then(data => {
    res.json(data);
  });
});

io.on("connection", function (socket) {
  console.log(socket.id, " connected");

  socket.on("msg", function (data) {
    socket.emit("msg", data);
    console.log(socket.id, data);

    io.sockets.emit("msg", data);
  });

  socket.emit(`${socket.id} 연결되었습니다.`);
});

/*    Mysql Event Listener    */
/*
const MySQLEvents = require("@rodrigogs/mysql-events");
const mysql = require("mysql");

const program = async () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "helmet_developer",
    password: "helmet1234!@#$",
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: true, // record new binary logs only
  });

  await instance.start();

  instance.addTrigger({
    name: "monitoring..",
    expression: "helmet_dev.*",
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: async event => {
      console.log("Event triggered");
      console.log(event.affectedRows[0].after);
      console.log("waiting new event..");

      //Send changed Data to Socket
      io.sockets.emit("msg", event.affectedRows[0].after);
    },
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program().catch(console.error);*/
