var express = require('express');
var app = express();
var port = 8080;

// Start the server
app.listen(port, function() {
	console.log('App started');
});

// Add a route
// req is request, res is response
app.get('/', function(req, res) { 
	res.send('Hello world!');
});

// Package nodemon:
	// Watch app for file changes
	// Automatically restart it
	// `npm install nodemon`
	// instead of `node server.js`
	// Run `nodemon server.js`