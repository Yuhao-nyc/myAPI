var express = require('express');
var path = require('path');
var router = express.Router();
var app = express();
// set your port
var port = process.env.PORT || 8080;


var bodyParser = require('body-parser');

//connects to DB
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/stocks_table')
        .then( () => console.log('mongodb connected successful'))
        .catch( (err) => console.log(err));


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', require('./routes/apiStock'));  //use is the route apiStock.js, require is just the file where is coming from

app.use('/api/', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

/* app.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('your IP address is', ip);
  next();
}); */

/*app.get('/', function(req, res) {
  res.send('API working now');
})*/

app.get('/api/:id', function(req, res, next) {
    Stocks.findById(req.param.id, function(err, data) {
        if (err) res.send(err);
        res.json(data);
    })
})

//views and templates
app.set('view engine', 'ejs');

//index page
app.get('/', function(req, res) {
  res.render('templates/index');
})

//about page
app.get('/about', function(req, res) {
  res.render('templates/about');
})

var routes = require('./routes/apiStock');
app.use('/', routes);


app.listen(port);
console.log('port is on ' + port);