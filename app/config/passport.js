var User = require('../../app/models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

passport.serializeUser(function(user, done) {
        console.log('Serialize Called');
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      console.log('De-Serialize Called');
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
		if(!user){return done(null, false, { message: req.flash('loginMessage', 'Incorrect email.')});}
		if(!user.validPassword(password)){
  		return done(null, false, {message: req.flash('loginMessage', 'Incorrect password.')});
		}
    req.session.key=req.body.email;
		return done(null, user);
		});

	}));



passport.use('register', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
		},
		function(req, username, password, done){
		    console.log('register'+username, password, req.body.displayname);

        User.findOne({email: new RegExp(username,"i")}, function(err, user){
          if(err) return done(err);
          if(user) return done(null,false,{message: req.flash('loginMessage','There is another user already registered with this email address.')})
          else{

            var newUser = new User();
            newUser.displayname = req.body.displayname;
            newUser.email = username;
            newUser.password = newUser.generateHash(password);
            console.log(newUser.email, newUser.password);
          newUser.save(function(err){
          console.log('saving');
            if(err)
              return done(err);
              console.log('savEd');
          return done(null, newUser);
          });
          }
        });

    }
));
}
