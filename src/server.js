import express from "express";
import axios from "axios";
import { sequelize } from "./config/_db.js";
import { Forecast } from "./model/Weather.js";

async function bootstrap(){
    
const app = express();
const port = process.env.PORT || 4963c;

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });


app.get('/weather', async (req, res) => {
  try {
    const { lat, lon, cnt} = req.query;

    if (!lat || !lon ||!cnt) {
      return res.status(400).json({ error: 'Latitude, longitude, and appid parameters are required' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt || 16}&appid=054de471a38f5ec3adf9aba29a1f8cc6`;

    const weatherResponse = await axios.get(apiUrl);
    const forecasts = weatherResponse.data.list.map((item) => ({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      cnt: parseInt(cnt),
      date: new Date(item.dt * 1000),
      temperature: item.temp.day,
      condition: item.weather[0].description,
    }));

    // Save forecast data to the database
    const savedForecasts = await Forecast.bulkCreate(forecasts);

res.status(200).json({
  success:true,
  forecast:savedForecasts,
  message:"Forecast saved successfully"
})

  } catch (error) {
    console.error('Error retrieving weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

}

bootstrap()