var User = require('../models/user');
var auth = require('../util/checkauth');
module.exports = function(app){

  app.get('/user', auth.isUserAuthenticated, function(req, res){
      User.find({type: {$ne:'root'}},'displayname email',function(err, data){
        if(err)console.log(err);
        if(data)res.end(JSON.stringify(data));
        else {
          res.end('No users found');
        }
      });//end of find not root
  });//end of get /user

  app.post('/user', auth.isUserAuthenticated, function(err, req, res){
    User.findOne({email: req.body.email}, function(err, data){
      if(err)console.log(err);
      if(data)res.end("Email is already used");
      else {
        var user = new User();
        user.displayname = req.body.displayname;
        user.email = req.body.email;
        user.password = user.generateHash(req.body.password);
        user.createdat = new Date();
        user.save(function(err){
          if(err)console.log(err);
          else{
            res.end('User added');
          }
        });//end of user save
      }
    });//end of findOne
  });//end of post /user
}//end of exports
