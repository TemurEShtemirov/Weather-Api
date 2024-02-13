import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/_db.js";

const Forecast = sequelize.define("Weather", {
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
