var User = require('../../app/models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    
    
passport.use('login', new LocalStrategy({
 		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
	function(req, username, password, done){
	console.log('login');
	User.findOne({email: username}, function(err, user){
		if(err){return done(err);}
		if(!user){console.log("incorrect login");return done(null, false, { message: 'Incorrect username.'});}
		if(!user.validPassword(password)){
			console.log("incorrect pass");return done(null, false, {message: 'Incorrect password.'});
		}
		return done(null, user);
		});
		
	}));
	
passport.use('register', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true
		},
		function(req, username, password, done){
		console.log('register'+username, password);
			var newUser = new User();
			newUser.email = username;
			newUser.password = newUser.generateHash(password);
			console.log(newUser.email, newUser.password);
			newUser.save(function(err){
			console.log('saving');
				if(err)
					throw err;
					console.log('savEd');
			return done(null, newUser);
			});
}));
}