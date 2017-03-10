var express = require('express');
var router = express.Router();
var app = express();
// set your port
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');

//connects to DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stocks_table');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', require('./routes/apiStock'));  //use is the route, require is just the file where is coming from


app.get('/', function(req, res) {
  res.send('API working now');
})

app.listen(port);
console.log('port is running on ' + port);