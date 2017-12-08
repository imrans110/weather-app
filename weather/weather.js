const request = require('request');

var getWeather = (lat,long, callback) => {

  request({
    url: `https://api.darksky.net/forecast/55e4483f4398af74acd9f49a3fc8ccb6/${lat},${long}?units=si`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to Weather API");
    } else if (body.code === 400) {
      callback('The given location (or time) is invalid.');
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemp: body.currently.apparentTemperature
      });
    }

  });
};
module.exports.getWeather = getWeather;
