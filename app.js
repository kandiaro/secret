var express = require('express');
	app = new express(),
	bodyParser = require ('body-parser'),
	session = require('express-session'),
	passport = require('passport'),
	configDB = require('./app/config/database'),
	mongoose = require('mongoose');
	
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
mongoose.connect(configDB.url);
 require('./app/config/passport')(passport);
 app.use(bodyParser.urlencoded({
 	extended: true
 	}));
 	
 app.use(session({
 	secret: "thisisasecret"
 }));
 
 app.use(passport.initialize());
 app.use(passport.session());

var routes = require('./app/routes/index.js')(app, passport);
app.listen(8080);
console.log("Now listening on http://localhost:8080");