import expressLoader from "./express";
import mqttLoader from "./mqtt";
import { Application } from "express";
import { Client } from "mqtt";

export default async (expressApp: Application) => {
  await expressLoader(expressApp);
  console.log("Express loaded");

  await mqttLoader();
  console.log("MQTT Client loaded");
};
