var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	email: String,
	password: String,
	role: Number,
});

module.exports = mongoose.model('Users', userSchema);