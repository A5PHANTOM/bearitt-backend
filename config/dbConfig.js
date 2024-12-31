import Sequelize from "sequelize";
import 'dotenv/config'

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port:3306,
  }
);