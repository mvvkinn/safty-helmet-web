import express from "express";
import http from "http";
import socketio from "socket.io";
import router from "./route";

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use("/", router);

const httpServer = http.createServer(app);
const io = socketio(httpServer);

httpServer.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

io.on("connection", socket => {
  console.log(socket.id, " connected");

  socket.onAny(event => {
    console.log(event);
  });

  socket.on("join", (data, done) => {
    socket.join(data);
    socket.rooms.forEach(room => console.log(room));
    done();
  });

  socket.on("helmetMsg", data => {
    const helmet_id = parseInt(data.helmet_id);

    socket.to(helmet_id).emit("helmetMsg", data);
  });

  socket.on("msg", data => {
    console.log(data);
  });
});
