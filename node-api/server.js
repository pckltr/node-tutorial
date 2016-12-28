// BASE SETUP
// ----------

// Call the packages we need
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

// Configure app to use bodyParser
// This will let us get POST data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// ------------------
var router = express.Router();

// Test route to make sure everything works
router.get('/', function(req, res) {
   res.json({message: 'Hello world!'}); 
});

// REGISTER OUR ROUTES
// -------------------
// All of them will be prefixed /api
app.use('/api', router);

// START THE SERVER
// ----------------
app.listen(port);
console.log(port + ' is the magical port');