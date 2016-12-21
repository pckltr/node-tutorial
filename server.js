// Import HTTP Module
var http = require('http');

// Handle sending requests, recv responses
function handleRequests(req, res) {
	// Return string (handle basic response)
	res.end('Hello world!');
}

// Create the server
var server = http.createServer(handleRequests);

// Start server, listen on port
server.listen(8080, function() {
	console.log('Listening on port 8080');
});