var User = require('../models/user');
exports.isUserAuthenticated = function (req, res, next) {
  	if (req.isAuthenticated()) {
  		return next();
  	}

  	req.session.redirectUrl = req.url;
  	res.redirect('/');
}//end of exports
