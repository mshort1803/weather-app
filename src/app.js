const path    = require('path');
const express = require('express');
const hbs     = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directiory
app.use(express.static(publicDirectoryPath));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Michelle Short',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Michelle Short',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Welcome to the help page',
    name: 'Michelle Short',
    helptext: 'This is some helpful text'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address to get the weather"
    });
    return
  }
  geocode(req.query.address, (error, {latitude, longitude} = {}) => {
    if(error) {
      console.log('error')
      res.send({'Error': error});
      return;
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        res.send({'Error': error});
        return;
      }
      res.send({
        location: req.query.address,
        data: forecastData,
      });
    })
  })
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
    return
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    helpmessage: "Sorry, we couldn't find the help article you asked for "
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    helpmessage: "Sorry, we couldn't find the page you asked for "
  })
});

// Start Server
app.listen(3000, () => {
  console.log("Server started...");
});
