var express = require('express');
	app = new express(),
	bodyParser = require ('body-parser'),
	session = require('express-session'),
	redis = require('redis'),
	redisStore = require('connect-redis')(session),
	passport = require('passport'),
	configDB = require('./app/config/database'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	client = redis.createClient();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
mongoose.connect(configDB.url);
 require('./app/config/passport')(passport);
 app.use(bodyParser());

 app.use(session({
 	secret: "thisisasecret",
	store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260}),
 }));
app.use(flash());
 app.use(passport.initialize());
 app.use(passport.session());

var routes = require('./app/routes/index.js')(app, passport);
app.listen(8080);
console.log("Now listening on http://localhost:8080");
