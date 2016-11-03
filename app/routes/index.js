module.exports = function(app, passport){

app.get("/", function(req, res){

	console.log("/ requested"+req.user);
	if(req.user)
		res.send("Welcome ");
	else {
		res.redirect('/login');
	}
});

app.get("/login", function(req, res){
	console.log(req.session.id);
	res.render("login.ejs",  { message: req.flash('loginMessage')});

});

app.post("/login", passport.authenticate('login', {
	successRedirect : '/profile',
	failureRedirect : '/login',
	failureFlash : true
	})
);

app.get("/register", function(req, res){
	console.log(req.session.id);
	res.render("register.ejs",  { message: req.flash('loginMessage')});

});

app.post("/register", passport.authenticate('register', {
	successRedirect : '/login',
	failureRedirect : '/register',
	failureFlash : true
	})

);

}
