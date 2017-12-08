const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs

  .options({
    a: {
      demand: true,
      string: true,
      alias: 'address',
      describe: 'Address to fetch weather for'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var fetchedLoc =  geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address, results.latitude, results.longitude);
    weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResults) => {
     if(errorMessage){
       console.log(errorMessage);
     }else {
       console.log(`Its currently ${weatherResults.temperature} degrees. It feels like ${weatherResults.apparentTemp} though`);
     }

   });
  }
});
