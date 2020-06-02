var express = require ('express');

var app = express();
var controller= require('./controllers/todolistcontroller');
//set up temp engine
app.set('view engine','ejs');

//static fi1es
app.use(express.static('./public'));
//firing controllers
controller(app);
//listen to port
app.listen(3000);
console.log('yo , listening to port 3000');
