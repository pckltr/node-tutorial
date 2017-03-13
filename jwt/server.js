// Get packages
var express		= require('express');
var app 		= express();
var bodyParser	= require('body-parser');
var morgan 		= require('morgan');
var mongoose	= require('mongoose');

var jwt 		= require('jsonwebtoken');
var config 		= require('./config');
var User		= require('./app/models/user');


// Configuration
var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

// Use body parser to get info from POST/URL params
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Use morgan to log reqs to console
app.use(morgan('dev'));


// Routes

// Basic route
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});
app.get('/setup', function(req, res) {
	// Create sample user
	var nick = new User({
		name: "Nick F",
		password: "password",
		admin: true
	});
	// Save sample user
	nick.save(function(err) {
		if (err) throw err;
		console.log('User saved successfully');
		res.json({success:true});
	});
});

// API Routes
var apiRoutes = express.Router();
// Authentication route POST /api/authenticate
apiRoutes.post('/authenticate', function(req, res) {
	// Find user
	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({success:false, message:'Authentiaction failed. User not found.'});
		} else if (user) {
			// Check if pw matches
			if (user.password != req.body.password) {
				res.json({success:false, message:'Authentication failed. Wrong password.'});
			} else {
				// If user found and pw right
				// Create token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: '24h' // 24 hrs
				});
				
				// Return info including token as json
				res.json({
					success: true,
					message: 'Enjoy the token, bud.',
					token: token
				});
			}
		}
	});
});
// Route middleware to verify a token (authorize)
apiRoutes.use(function(req, res, next) {
	// Check header/url params for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// Decode token
	if (token) {
		// Verify secret, check exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({success: false, message:'Failed to authenticate token.'})
			} else {
				// If everything good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// If there is no token, return error
		return res.status(403).send({
						  success: false,
						  message: 'No token provided.'
						  });
	}
});
// Show random msg GET /api
apiRoutes.get('/', function(req, res) {
	res.json({message: 'Welcome to the best API since 1964'});
});
// return all users GET /api/users
apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});
// Apply routes with prefix /api
app.use('/api', apiRoutes);

// Start the server
app.listen(port);
console.log('Server started on http://localhost:' + port);