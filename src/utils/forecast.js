const WEATHER_API_KEY = "72dde8ba84753e9fa0753a63c2b61363";
const WEATHER_API_URL = `https://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}`;

const request = require("request");

const forecast = ({ lat, lon }, callback) => {
  request(
    { url: `${WEATHER_API_URL}&query=${lat}, ${lon}&units=m`, json: true },
    (error, response) => {
      if (error) callback(error);
      else if (response.body.error)
        callback(Error("location could not be found"));
      else callback(undefined, response.body);
    }
  );
};

module.exports = { forecast };
