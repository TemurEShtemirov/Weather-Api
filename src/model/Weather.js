// models.js

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
  appid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  units: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: true,
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
