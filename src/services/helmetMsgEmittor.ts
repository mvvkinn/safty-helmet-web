import mqtt from "@loaders/mqtt";
import { MqttClient } from "mqtt";
import { Sequelize } from "sequelize";
import { Container } from "typedi";
import { Logger } from "winston";
import models from "@models";
import io from "socket.io-client";
import config from "@config";

// export default () => {
const SensorBroadcast = async () => {
  const client: MqttClient = Container.get("mqtt");
  const logger: Logger = Container.get("logger");
  const db: Sequelize = Container.get("db");

  await models(db);

  // const helmetModel = db.models.Helmet;

  const socket = io(`http://localhost:${config.port}`);

  client.on("connect", options => {
    client.subscribe("helmet");
  });

  client.on("message", async (topic, msg, packet) => {
    console.log(msg.toString());

    // when topic is helmet and message is typeof JSON
    if (topic === "helmet" && stringToJson(msg.toString())) {
      const json = stringToJson(msg.toString());
      const date = new Date();

      json.updated_time = date;

      socket.emit("helmetMsg", json);
    }
  });
};

export default SensorBroadcast;

/**
 * Convert string to JSON
 * @param str
 * @returns typeof(JSON.parse(str)) == JSON ? JSON : false
 */
function stringToJson(str: string): any {
  try {
    const json = JSON.parse(str);
    return json;
  } catch (e) {
    return false;
  }
}
