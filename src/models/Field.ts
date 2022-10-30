import { Model } from "@loaders/mysql";
import { IField } from "@interfaces/IField";

export default new Model<IField & Document>("field");
