import "dotenv/config";
const config = {
  development: {
    username: process.env.DB_USERNAME || "avnadmin",
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 6543,
    dialect: "postgres",
    database: "postgres"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 6543,
    dialect: "postgres",
    database: "postgres_test"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 6543,
    dialect: "postgres",
    database: "postgres"
  }
};

export default config;
