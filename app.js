var express =  require('express');
var controller = require('./controllers/controller');

var app = express();
app.set('view engine','ejs');
app.use('/assets',express.static('assets'))
app.use('/controllers',express.static('controllers'))
app.listen(8002,'0.0.0.0');
controller(app);
