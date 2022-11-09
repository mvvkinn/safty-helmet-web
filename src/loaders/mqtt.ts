import mqtt from "mqtt";
import config from "@config";

const client = mqtt.connect(config.mqtt);

export default client;
