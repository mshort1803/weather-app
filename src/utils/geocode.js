const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXNob3J0MTgwMyIsImEiOiJjbGF5bWFjaWIwMmxmM29ubHlmd3l3cWcwIn0.e7R3L5aitewQw12KWDlWmA'
    request({ url, json: true}, (error, { body }) => {
      if(error) {
        callback('Unable to connect to the geocoding service!', undefined);
      } else if (body.features.length === 0) {
        callback('Unable to find location', undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }

    });
};

module.exports = geocode;
