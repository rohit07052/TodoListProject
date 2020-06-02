var bodyParser= require('body-parser');
var mongoose = require('mongoose');
//var data = [{item: '100 push-ups'},{ item: 'morning-walk'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//connect to the database
mongoose.connect(  'mongodb+srv://RohitSingh:Rohitwantsdata@cluster0-cuhmj.mongodb.net/test',{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set('useUnifiedTopology', true);
var todoSchema = new mongoose.Schema({
  item: String
});
var Todo = mongoose.model('Todo',todoSchema);
//var itemOne = Todo({item:'buy flowers'}).save(function(err){
//if(err) throw err;
//  console.log('item saved');
//});
module.exports = function(app){
  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todos:data});
    });
  });
  app.post('/todo',urlencodedParser,function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });
  });
  app.delete('/todo/:item',function(req,res){
      Todo.find({item: req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
          if(err) throw err;
          res.json(data);
        });
    });
};
