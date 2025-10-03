import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",   // your DB user
  password: "postgres",   // your DB password
  database: "store",      // your DB name
  logging: false,
  
});
