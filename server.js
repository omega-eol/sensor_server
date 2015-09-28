// Dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path');

// connect to MongoDB
mongoose.connect('mongodb://localhost/air_box');

// Express
var app = express();

// Configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// use middle ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './bower_components/')));

// Routes
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/pages'));


// Start the server on port 3000
app.listen(3000);
console.log('Server is running on port 3000..');