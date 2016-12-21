var express = require('express');
var app = express();
var port = 8080;

// Show app where routes are
var router = require('./app/routes');
app.use('/', router); // (express middleware function)

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