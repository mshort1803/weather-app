const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=58fff5efc825ef4a9d86782fd0b5ee58&query=' + latitude + ',' + longitude;
  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to the weather service!', undefined);
    } else if(body.error) {
      callback('Unable to find location!', undefined);
    } else {
      current_temperature = body.current.temperature;
      feels_like = body.current.feelslike;
      weather_description = body.current.weather_descriptions[0]
      callback(undefined, "The weather is currently " + weather_description + ". The tempereature is currently " + current_temperature + " and it feels like " + feels_like + " degrees");
    }
  })
};

module.exports = forecast
