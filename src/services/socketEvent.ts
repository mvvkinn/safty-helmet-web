import Container from "typedi";
import { Logger } from "winston";
import { Server } from "socket.io";
import socketClient from "socket.io-client";
import TelegramBot from "node-telegram-bot-api";
import config from "@config";
import { Sequelize } from "sequelize";

export default () => {
  const logger: Logger = Container.get("logger");
  const io: Server<any> = Container.get("io");
  const telegramBot: TelegramBot = Container.get("telegram");
  const db: Sequelize = Container.get("db");

  io.on("connection", socket => {
    /** Join to by id to get sensor data */
    socket.on("join", (data: any, done: any) => {
      socket.join(data.toString());
      socket.rooms.forEach(room => {
        logger.info(`Socket rooms : ${room}`);
      });
      done();
    });

    /** Callback on helmet message */
    socket.on("helmetMsg", async (data: any) => {
      await db.models.Helmet.update(data, {
        where: { helmet_id: data.helmet_id },
      });

      socket.to(data.helmet_id).emit("helmetMsg", data);
      socket.emit("helmetMsg", data);
      logger.info(`helmet: ${data.helmet_id} sent message ${new Date()}`);

      /**
       * Send report message to Observer's telegram
       * @TODO Save chat_id of observer on DB and use that. not from config
       * @TODO Get name of worker from DB
       * */
      if (data.worker_danger) {
        const message = `${"김민우"} 근로자 충격 직후 움직임이 없습니다.\n 신고하려면 /report 를 눌러주세요`;
        telegramBot.sendMessage(config.telegram.chat_id, message);
      }

      if (data.shock) {
        const message = `${"김민우"} 근로자 충격이 감지되었습니다`;
        telegramBot.sendMessage(config.telegram.chat_id, message);
      }
    });

    /** Report Event */
    socket.on("report", (data: any) => {
      const message = `${"김민우"} 근로자 응급신고가 접수되었습니다.`;
      telegramBot.sendMessage(config.telegram.chat_id, message);
      logger.info(`신고접수 ${data}`);
    });

    socket.on("msg", (data: any) => {
      logger.info(`Socket Message: ${data}`);
    });
  });

  telegramBot.on("message", msg => {
    const chatId = msg.chat.id;

    console.log(chatId);

    if (msg.text == "/report") {
      const message = `${"김민우"} 근로자 응급신고가 접수되었습니다`;
      telegramBot.sendMessage(msg.chat.id, message);
    }
  });
};
