// Dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// connect to MongoDB
mongoose.connect('mongodb://localhost/air_box');

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'))

// Start the server on port 3000
app.listen(3000);
console.log('Server is running on port 3000..');