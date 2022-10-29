import mqtt from "mqtt";
import config from "@config";

export default async () => {
  const client = await mqtt.connect(config.mqtt);

  client.on("connect", options => {
    client.subscribe("helmet", err => {
      if (err) console.log(err);
    });

    console.log("Connected to MQTT Server");
  });

  client.on("message", (topic, msg, packet) => {
    const json = stringToJson(String(msg));
    if (!json) {
    }
  });
};

/**
 *
 * @param str
 * @returns typeof(JSON.parse(str)) == JSON ? JSON : false
 */
function stringToJson(str: string) {
  try {
    const json = JSON.parse(str);
    return json;
  } catch (e) {
    return false;
  }
}
