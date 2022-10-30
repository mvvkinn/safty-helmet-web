import { Model } from "@loaders/mysql";
import { IHelmet } from "@interfaces/IHelmet";

export default new Model<IHelmet & Document>("helmet");
