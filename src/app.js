const express = require('express');
const nunjucks = require('nunjucks');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const app = express();

// connect to the MongoDB database
mongoose.connect('mongodb://localhost/nodetest', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// define the schema for the userdata collection
const userdataSchema = new mongoose.Schema({
  name: String,
  sex: String,
  age: Number,
  country: String,
  dateCreated: { type: Date, default: Date.now }
});

// compile the schema into a model
const Userdata = mongoose.model('Userdata', userdataSchema);

// configure nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// middleware to serve static files
app.use(express.static('public'));


// define get routes
app.get('/', (req, res) => {

  getCountries()
    .then(countries => {
      const formData = null;
      res.render('index.html', { countries, isError });
    })
    .catch(error => {
      console.error(error);
      res.render('index.html', { errors: [{ val: 0, msg: "Unable to load countries. Please reload the page" }] });
    });
});

// define post routes for posting the form data
app.post('/', [
  // validate input using express validator
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('sex').trim().notEmpty().withMessage('Please select an opton for sex'),
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be number and not empty'),
  body('country').trim().notEmpty().withMessage('Country is required')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // re-render the form with error messages
    getCountries()
      .then(countries => {
        res.render('index.html', { errors: errors.array(), formData: req.body, countries, isError });
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  } else {
    // save the userdata to the database (mongo)
    const { name, sex, age, country } = req.body;

    const userdata = new Userdata({ name, sex, age, country });

    try {
      const results = await userdata.save()
      res.render('success.html', { name: req.body.name })
    }
    catch (e) {
      res.render('index.html', { errors: [e.message], formData: req.body, countries });
    }

  }
});

// start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
  console.log('Nagivate to http://localhost:3001 to browse the application')
});

// Helper functions

// get list of countries in Europe from the REST API
const getCountries = async () => {
  return new Promise((resolve, reject) => {
    axios.get('https://restcountries.com/v3.1/region/europe')
      .then(response => {
        const data = Object.values(response.data)
        const countries = response.data.map(country => country.name.common);
        resolve(countries)
      })
      .catch(error => {
        console.error(error);
        reject(error)
      });

  })

}
// Function to return the validation class based on the error and input name as paramVal

const isError = (paramVal, errors) => {
  if (errors) {
    const error = errors.find(error => error.param == paramVal)
    if (error) {
      return "is-invalid"
    } else {
      return "is-valid"
    }
  } else {
    return ""
  }
}
// Defining the exportsƒ
module.exports = { app, getCountries, isError }