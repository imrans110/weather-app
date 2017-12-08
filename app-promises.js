const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.a);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var long = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.darksky.net/forecast/55e4483f4398af74acd9f49a3fc8ccb6/${lat},${long}?units=si`
  console.log(response.data.results[0].formatted_address);

  return axios.get(weatherURL);

}).then((response) => {
var temperature = response.data.currently.temperature;
var apparentTemp = response.data.currently.apparentTemperature;

console.log(`Its currently ${temperature} but it feels like ${apparentTemp}`);

}).catch((e)=>{
if(e.code === "ENOTFOUND"){
console.log("Unable to connect to google servers");
}else{
  console.log(e.message);
}
});
