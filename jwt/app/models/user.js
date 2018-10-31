// Instance of mongoose and schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set up model and pass with module.exports
module.exports = mongoose.model('User', new Schema({
	name: String,
	password: String,
	admin: Boolean
}));
