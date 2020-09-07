var express =  require('express');
var controller = require('./controllers/controller');
const RateLimit = require('express-rate-limit');

var app = express();
app.set('view engine','ejs');
app.enable('trust proxy'); 
const apiLimiter = new RateLimit({
  windowMs: 15*60*1000, 
  max: 100,
});
app.use('/', apiLimiter);
app.use('/view', apiLimiter);
app.use('/assets',express.static('assets'))
app.use('/controllers',express.static('controllers'))
app.listen(8080,'0.0.0.0');
controller(app);
