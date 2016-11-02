module.exports = function(app, passport){

app.get("/", function(req, res){

	console.log("/ requested");
		res.send("Welcome ");
});

app.get("/login", function(req, res){
	console.log(req.session.id);
	res.render("login.ejs",  { message: 'Please login'});
});

app.post("/login", passport.authenticate('login', {
	successRedirect : '/profile',
	failureRedirect : '/login',
	failureFlash : false
	})
);
}
