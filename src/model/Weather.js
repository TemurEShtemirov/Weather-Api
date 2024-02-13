import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "./db.js";

const Forecast = sequelize.define("Forecast", {
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lon: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cnt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Forecast };
