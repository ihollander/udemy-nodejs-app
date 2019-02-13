const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "node-udemy",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST
  }
);

module.exports = sequelize;
