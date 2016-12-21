var express = require('express');

// Create router object - apply all routes to the router instead of the entire app
var router = express.Router();

// Export router for use in server.js
module.exports = router;

// Home route
router.get('/', function(req, res) { 
	res.send('Hello world!');
});
// About route
router.get('/about', function(req, res) {
	res.send('About page');
});
// Contact route
router.get('/contact');
router.post('/contact');