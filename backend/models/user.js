const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
    name: String,
	surname: String,
	password: String

});

const User = mongoose.model('User', userSchema, 'user');
module.exports = User;
