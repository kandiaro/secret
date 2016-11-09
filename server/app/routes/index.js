
module.exports = function(app, passport){
require('./list')(app);
require('./users')(app);
require('./record')(app);
app.get("/", function(req, res){

	console.log("/ requested"+req.user);
		res.render('index.ejs', {message: req.flash('loginMessage')});
});

app.get("/login", function(req, res){
	console.log(req.session.id);
	res.render("login.ejs",  { message: req.flash('loginMessage')});

});

app.post("/login", passport.authenticate('login', {
	successRedirect : '/',
	failureRedirect : '/#loginModal',
	failureFlash : true
	})
);

app.get("/register", function(req, res){
	console.log(req.session.id);
	res.render("register.ejs",  { message: req.flash('loginMessage')});

});

app.post("/register", passport.authenticate('register', {
	successRedirect : '/',
	failureRedirect : '/',
	failureFlash : true
	})

);

app.get('/profile', function(req,res){
		res.render('profile.ejs')
});

}
