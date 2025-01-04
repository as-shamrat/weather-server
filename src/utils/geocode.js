const request = require("request");
const GEO_API_KEY = "664493c90a884999895305hjc6ccc35";
const GEO_URL = `https://geocode.maps.co/search?`;
const geocode = (address, callback) => {
  request(
    { url: `${GEO_URL}q=${address}&api_key=${GEO_API_KEY}`, json: true },
    (error, response) => {
      if (error) {
        console.log(error);
        callback(error);
      } else if (response.body.length === 0) {
        const customError = new Error("location could not be found");
        callback(customError);
      } else {
        callback(undefined, {
          lat: response.body[0].lat,
          lon: response.body[0].lon,
          displayName: response.body[0].display_name,
        });
      }
    }
  );
};

module.exports = { geocode };
