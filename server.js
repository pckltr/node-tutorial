var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;

// Use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Use body parser
app.use(bodyParser.urlencoded());

// Show app where routes are
var router = require('./app/routes');
app.use('/', router); // (express middleware function)

// Set static files location
app.use(express.static(__dirname + '/public'));

// Start the server
app.listen(port, function() {
	console.log('App started');
});

// Package nodemon:
	// Watch app for file changes
	// Automatically restart it
	// `npm install nodemon`
	// instead of `node server.js`
	// Run `nodemon server.js`