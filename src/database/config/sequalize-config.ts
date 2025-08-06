import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import EnvConfig from "../../config/env-config";
import Notes from "../models/Notes.model";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: EnvConfig.Postgress.Db,
  user: EnvConfig.Postgress.Username,
  password: EnvConfig.Postgress.Password,
  host: EnvConfig.Postgress.Host,
  port: EnvConfig.Postgress.Port,
  clientMinMessages: "notice",
  models: [Notes],
});

export default sequelize;
