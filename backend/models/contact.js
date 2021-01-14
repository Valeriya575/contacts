const mongoose = require('mongoose');
var User = require('../models/user');

const contactSchema = new mongoose.Schema({
	
    name: String,
	surname: String,
	number: String,
	user:{ type: mongoose.Schema.ObjectId, ref: 'User'}
	
});

const Contact = mongoose.model('Contact', contactSchema, 'contact');

module.exports = Contact;
