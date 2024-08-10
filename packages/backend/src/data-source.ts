import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: false,
  logging: false,
  entities: [__dirname + "/entity/*.{ts,js}"],
  migrations: [__dirname + "/migration/*.{ts,js}"],
  subscribers: [],
});
