import {Sequelize} from "sequelize";
import fs from "fs";
import path from "path";
import "dotenv/config.js";
import process from "process";
const sslCertificate = fs.readFileSync(path.resolve("db_ssl.pem"), "utf8");

// Create Sequelize instance
// const sequelize = new Sequelize("defaultdb", process.env.DB_USERNAME as string, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   port: 24487,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: true,
//       ca: sslCertificate
//     }
//   },
//   logging: false
// });
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve("app.db"),
  logging: false
});

export default sequelize;
