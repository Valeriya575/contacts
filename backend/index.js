"use strict";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt');

const mongodb_database_url = "mongodb://localhost:27017/mean_stack_setup";
mongoose.connect(mongodb_database_url, { useNewUrlParser: true ,  useUnifiedTopology: true} );
var db = mongoose.connection;

// register a callback for a successful connection
db.on("connected", () => {
  console.log("Connected to database " + mongodb_database_url);  
});
// register a callback for MongoDB errors
mongoose.connection.on("error", err => {
  console.log("Database error: " + err);
});

//create route
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

const port = 3000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});


require('./routes')(app, db);