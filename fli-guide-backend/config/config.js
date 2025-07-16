// config/config.js
require("dotenv").config();

const requiredEnv = ["DB_NAME", "DB_USER", "DB_HOST", "DB_PORT"];
for (const key of requiredEnv) {
   if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
   }
}

const config = {
   development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: parseInt(process.env.DB_PORT, 10),
   },
   test: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD || null,
      database: `${process.env.DB_NAME}_test`,
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: parseInt(process.env.DB_PORT, 10),
   },
   production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD || null,
      database: `${process.env.DB_NAME}`,
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: parseInt(process.env.DB_PORT, 10),
   },
};

module.exports = config;