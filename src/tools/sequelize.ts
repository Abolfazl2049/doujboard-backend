import {Sequelize} from "sequelize";
import fs from "fs";
import path from "path";
import "dotenv/config.js";
import process from "process";
const sslCertificate = fs.readFileSync(path.resolve("db_ssl.pem"), "utf8");

// Create Sequelize instance
const sequelize = new Sequelize("postgres", process.env.DB_USERNAME as string, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 6543,
  dialect: "postgres",
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: true,
  //     ca: sslCertificate
  //   }
  // },
  logging: false,
  pool: {
    maxUses: 20
  }
});

export default sequelize;
