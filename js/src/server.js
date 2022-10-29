import express from "express";
import http from "http";
import socketio from "socket.io";
import router from "./route";
import Telegram from "node-telegram-bot-api";
import config from "../config/config.json";

const app = express();

const token = config.telegram.token;
const chat_id = config.telegram.chat_id;
const bot = new Telegram(token, { polling: true });
let sentOnce = false;

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

    if (data.worker_danger && !sentOnce) {
      const message =
        "김민우 근로자 충격 직후 움직임이 없습니다.\n 신고하시려면 /report 를 눌러주세요";

      bot.sendMessage(chat_id, message);

      sentOnce = true;
    } else {
      sentOnce = false;
    }

    if (data.shock) {
      const message = "김민우 근로자 충격이 감지되었습니다.";

      bot.sendMessage(chat_id, message);
    }
  });

  socket.on("report", data => {
    console.log("report on", data);

    const message = `김민우 근로자 응급신고가 접수되었습니다.`;

    bot.sendMessage(chat_id, message);
  });

  socket.on("msg", data => {
    console.log(data);
  });
});

bot.onText("/report", () => {
  const message = "김민우 근로자 응급신고가 접수되었습니다.";
  bot.sendMessage(chat_id, message);
});
