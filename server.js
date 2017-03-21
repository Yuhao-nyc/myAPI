var express = require('express');
var path = require('path');
var router = express.Router();
var app = express();
// set your port
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');

//render static resource files from assets
app.use('/assets', express.static(__dirname + '/assets'));

//render static file from build
app.use('/build', express.static('build'));

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

//send a simple message to the page
/*app.get('/', function(req, res) {
  res.send('API working now');
})*/

//parse JSON from url
var request = require('request');
var url_json = 'http://localhost:8080/api/stocks';
request(url_json, function(err, res, body) {

    /*if (!err && res.statusCode === 200) {
      var apiResponse = JSON.parse(body);

      for (var i=0; i<apiResponse.length; i++) {
          console.log('symbols: ' + apiResponse[i].symbol + ';' +
          ' stock open price: ' + apiResponse[i].open + ';' +
          ' stock today highest price: ' + apiResponse[i].high + ';' +
          ' stock today lowest price: ' + apiResponse[i].low + ';' +
          ' stock volume: ' + apiResponse[i].volume + ';' +
          ' stock volatility: ' + apiResponse[i].volatility + ';' +
          ' stock last updated at: ' + apiResponse[i].updated_at);
      }

    } else {
      console.log(err);
    }*/
})

//read a json FILE!!!
/* var fs = require('fs');
fs.readFile('url_json', 'utf8', function(err, data) {
    for (var stock in data) {
      console.log(stock.symbol);
    }
}) */

//CRUD each methods
app.get('/api/:id', function(req, res, next) {
    Stocks.findById(req.param.id, function(err, data) {
        if (err) res.send(err);
        res.json(data);
    })
})

//views and templates
app.set('view engine', 'ejs');

/*//index page
app.get('/', function(req, res) {
  var stocks = [
    {
    "symbol":"SNAP",
    "open":17.75,
    "close":22.32,
    "trades": false
    },
    {
    "symbol":"ORCL",
    "open":47.75,
    "close":62.32,
    "trades": true
    },
    {
    "symbol":"NVDA",
    "open":32.75,
    "close":56.32,
    "trades": true
    }
  ];

  var disclaimer = "trade all stocks in your own discretion!"

  res.render('templates/index', {
    stocks: stocks,
    disclaimer: disclaimer
  });
})
//about page
app.get('/about', function(req, res) {
  res.render('templates/about');
})*/

//parsing synchronous JSON files
var routes = require('./routes/apiStock');
app.use('/', routes);

app.listen(port);
console.log('port is on ' + port);