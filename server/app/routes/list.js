var List = require('../models/list'),
    auth = require('../util/checkauth');
module.exports = function(app){

  app.get('/list', auth.isUserAuthenticated, function(req,res){
      List.find({listowner : req.user._id}, function(err, data){
        if(err)console.log(err);
          console.log(data);
          if(data){
              res.end(JSON.stringify(data));
          }
          else {
            res.end('No records found');
          }
        });
  });

  app.get('/list/:id', auth.isUserAuthenticated, function(req, res){
    List.findOne({_id: mongoose.Types.ObjectId(req.params.id), listowner: req.user._id}, function(err, data){
      if(err)console.log(err);
      if(data)res.end(JSON.stringify(data));
      else {
        res.end('No Records found');
      }
    });
  });

  app.post('/list', auth.isUserAuthenticated, function(req,res){
      var newList = new List();
      newList.listname = req.body.listname;
      newList.listowner = req.user._id;
      newList.save(function(err){
          if(err)console.log(err);
          else {
            res.end("Added list");
          }
      });
  });

  app.put('/list/:id', auth.isUserAuthenticated, function(res, req){
        List.find({_id: req.body.listid, listowner: req.user._id}, function(err, data){
            if(err)res.end(err);
            if(!data)res.end('invalid record');
            if(data){
              data.listname = req.body.listname;
              data.save(function(err){
                if(err)res.end('Could not update list');
                else res.end('list udpated');
              });
            }
        });
  });

  app.delete('/list/:id', auth.isUserAuthenticated, function(req,res){
      List.findOne({id: mongoose.Types.ObjectId(req.params.id), listowner: req.user._id},function(err, data){
      if(err)console.log(err);
      if(data){
        List.findOneAndRemove({_id : req.params.id}, function(err, doc, result){
          if(err)console.log(err);
          if(doc)res.end('Record deleted');
        });
      }else{
        res.end('No Records found');
      }
    });
  });

  app.get('/createlist', auth.isUserAuthenticated, function(req,res){
    res.render('addlist.ejs',{message: "loginMessage"});
  });

}
