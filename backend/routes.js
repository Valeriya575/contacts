var Contact = require('./models/contact');
var User = require('./models/user');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var ObjectID = require('mongodb').ObjectID; 


module.exports = function(app, db){
	
	// Generic error handler used by all endpoints.
   function handleError(res, reason, message, code) {
     console.log("ERROR: " + reason);
     res.status(code || 500).json({"error": message});
   }
	
	// Post contact
	app.post("/contacts", function(req, res){
		
		new_contact = new Contact();
		new_contact.name = req.body.name;
		new_contact.surname = req.body.surname;
		new_contact.number = req.body.number;
		
		const decoded = jwt.verify(req.body.token, 'secret-key-placeholder');  
		var userId = decoded.user;
		db.collection('user').findOne({"_id": ObjectID(userId)}, function(err, user){
			new_contact.user = user;
			
			new_contact.save().then((response) => {
				res.status(201).json({
					message: "Contact successfully created!",
					result: response
				});
			}).catch(error => {
				res.status(500).json({
				});
			});
		});

		
		
	});

	// Get all contacts for current user
	app.get("/contacts", function(req, res) {
		var token = req.query.token;
		if(token !== "null"){
			
			const decoded = jwt.verify(token, 'secret-key-placeholder');  
			var userId = decoded.user;
			db.collection('contact').find({"user": ObjectID(userId)}).toArray(function(err, contact){
				res.send(contact);
			});
		}
		else
			res.status(500).json({});
	});
	
	// Get a specific contact 
	app.get('/contacts/:id', (req, res) => {
		db.collection('contact').findOne({
			"_id": ObjectID(req.params.id)
			}, function(err, contact){
				res.send(contact);
			});
	});


	// Updates a specific contact
	app.put('/contacts/:id', function (req, res) {
		
		var assignment = {
			
			"name": req.body.name,
			"surname": req.body.surname, 
			"number": req.body.number
			
		};

		db.collection('contact').updateOne(
		
			{"_id": ObjectID(req.params.id)}, 
			
			{$set: assignment},(err, doc) =>{
				if (err) 
				{
					console.log('Error in Assignment Update: '+JSON.stringify(err,undefined,2));
				}else {
					res.send(doc);
				}
		});
	});
	
	// Delete a specfic contact
	app.delete('/contacts/:id', function (req, res) {
		
		db.collection('contact').deleteOne({"_id": new ObjectID(req.params.id)}, function(err, result) {
			if (err) {
				handleError(res, err.message, "Failed to delete contact");
			} else {
				res.status(200).json(req.params.id);
			}
		});
	});
	
	// Registers a new user
	app.post('/register', function (req, res, next) {
		
		// Hash the password using bcrypt
		bcrypt.hash(req.body.password, 10).then((hash) => {
			new_user = new User();
			new_user.name = req.body.name;
			new_user.surname = req.body.surname;
			new_user.username = req.body.username;
			new_user.password = hash;
			
			new_user.save().then((response) => {
				res.status(201).json({
					message: "User successfully created!",
					result: response
				});
			}).catch(error => {
				res.status(500).json({
					error: error
				});
			});
		});
		
	});

	// Logs the user in
	app.post('/login', function (req, res, next) {
		
		const {username, password } = req.body;

		// Find user by username
		if(password !== "")
			db.collection('user').findOne({
				"username": req.body.username			
				}, function(err, foundUser){
					
					if(err || foundUser == null){
						res.status(500).json({
							err: err
						});
					}
					else{
						bcrypt.compare(password, foundUser.password).then((match) => {
						if (!match) {
								res.status(500).json({
							});
						} else {
							// All OK, generate  a new token
							let payload = {user: foundUser._id};
							const token = jwt.sign(payload,'secret-key-placeholder', {expiresIn: '2h'});
							res.status(200).json({ token, message: 'Enjoy your token!' });
						}
						});
						
						
					}
					
			});
		else{
			res.status(500);

		}
			

	});
	
	
}