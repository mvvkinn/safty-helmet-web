import config from "@config";
import Telegram from "node-telegram-bot-api";

const telegramInstance = new Telegram(config.telegram.token, { polling: true });

export default telegramInstance;
