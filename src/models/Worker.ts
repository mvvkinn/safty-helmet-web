import { IWorker } from "@interfaces/IWorker";
import { Model } from "@loaders/mysql";

export default new Model<IWorker & Document>("worker");
