

//dependencies

var express = require('express');
var router = express.Router();


//models
var Stocks = require('../models/stocks');

//Routes
Stocks.methods(['get', 'put', 'post', 'delete']);
Stocks.register(router, '/stocks');

//return router
module.exports = router;