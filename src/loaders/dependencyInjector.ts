import models from "@models";
import helmetMsgEmittor from "@services/helmetMsgEmittor";
import { MqttClient } from "mqtt";
import { Sequelize } from "sequelize";
import { Container } from "typedi";
import LoggerInstance from "./logger";
import telegramInstance from "./telegram";
import socketIo from "./socket.io";
import { Server } from "http";
import socketEvent from "@services/socketEvent";

export default async (
  sequelizeInstance: Sequelize,
  mqttInstance: MqttClient,
  httpServer: Server
) => {
  /** Winston Logger */
  Container.set("logger", LoggerInstance);

  /** Sequeulize Logger */
  Container.set("db", sequelizeInstance);

  /** MQTT Client */
  Container.set("mqtt", mqttInstance);

  /** Telegram Bot */
  Container.set("telegram", telegramInstance);

  /** socket.io Server */
  Container.set("io", socketIo(httpServer));

  models(sequelizeInstance);

  helmetMsgEmittor();
  socketEvent();
};
