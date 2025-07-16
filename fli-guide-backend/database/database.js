const { Sequelize } = require("sequelize");
const config = require("../config/config");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
   dbConfig.database,
   dbConfig.username,
   dbConfig.password,
   {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      port: dbConfig.port,
      logging: false,
   }
);

(async () => {
   try {
      await sequelize.authenticate();
      console.log("✅ MySQL connection has been established successfully.");
   } catch (error) {
      console.error(
         "❌ Unable to connect to the MySQL database:",
         error.message
      );
   }
})();

module.exports = sequelize;
