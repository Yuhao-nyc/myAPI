

//dependencies

var express = require('express');
var router = express.Router();


//models
var Products = require('../models/products');

//Routes
Products.methods(['get', 'put', 'post', 'delete']);
Products.register(router, '/products');

//return router
module.exports = router;