var Record = require('../models/record'),
    List = require('../models/list'),
    auth = require('../util/checkauth');

module.exports = function(app){

  app.get('/record', auth.isUserAuthenticated, function(req, res){
      List.find({listowner: req.user._id}, function(err, data){
        if(err)res.end(err);
        console.log(data);
        if(data){
        var listids = data.map(function(el){return el._id});
        console.log(listids);
        Record.find({listid: {$in: listids.map(mongoose.Types.ObjectId)}},function(err, data){
          if(err)console.log(err);
          console.log(data);
          if(data){res.end(JSON.stringify(data));}
          else{
            res.end('no records found');
          }
        });
      }
      });//end of list find
  });//end of get record

  app.get('/record/:id', auth.isUserAuthenticated, function(req, res){


  });

  app.post('/record', auth.isUserAuthenticated, function(req, res){
      var newRecord = Record();
      newRecord.recordname = req.body.recordname;
      newRecord.url = req.body.url;
      newRecord.username = req.body.username;
      newRecord.password = req.body.password;
      newRecord.note = req.body.note;
      newRecord.listid = req.body.listid;
      newRecord.save(function(err){
        if(err)res.end('Could not create record');
        else{res.end('Record created');}
      });
  });
  app.get('/newrecord',  function(req, res){
    res.render('../views/addrecord.ejs',{message: "loginMessage"});
  });

}
