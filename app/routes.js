var express = require('express');
var path = require('path'); // Node's helper for view paths, delimiters, etc.

// Create router object - apply all routes to the router instead of the entire app
var router = express.Router();

// Export router for use in server.js
module.exports = router;

// Home route
router.get('/', function(req, res) { 
	res.render('pages/index');
});
// About route
router.get('/about', function(req, res) {
	res.render('pages/about');
});
// Contact route
router.get('/contact', function(req, res) {
	res.render('pages/contact');
});
router.post('/contact', function (req, res) {
	
});