// index.js

import express from "express";
import axios from "axios";
import { sequelize } from "./db.js";
import { Forecast } from "./models.js";



async function bootstrap(){
    
const app = express();
const port = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.get("/weather", async (req, res) => {
  try {
    const { lat, lon, cnt } = req.query; // Get the latitude, longitude, and count from the query parameters

    if (!lat || !lon || !cnt) {
      return res.status(400).json({
        error: "Latitude, longitude, and count parameters are required",
      });
    }

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=YOUR_API_KEY`
    ); // Replace with your API key
    const forecasts = weatherResponse.data.list.map((item) => ({
      date: new Date(item.dt * 1000),
      temperature: item.temp.day,
      condition: item.weather[0].description,
    }));

    // Save forecast data to the database
    const savedForecasts = await Forecast.bulkCreate(forecasts);

    res.json(savedForecasts);
  } catch (error) {
    console.error("Error retrieving weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

}

bootstrap()