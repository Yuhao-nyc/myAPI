

//dependencies

var express = require('express');
var router = express.Router();


//models
var Stocks = require('../models/stocks');

//create a local data source and save to mongo DB without using Postman
var stock = new Stocks({symbol: 'NODEJS', open: 2229999, close: 122211111, trades: false});
stock.save(function(err){
  if(err)
    console.log(err);
  else
    console.log(stock);
});

//simpler version
Stocks.create({symbol: 'NODEJS', open: 9999, close: 222222, trades: true}, function(err, todo){
  if(err) console.log(err);
  else console.log(todo);
});


//mongod db query language
// show all data in the stocks collection
Stocks.find(function (err, todos) {
  if (err) return console.error(err);
  console.log(todos)
});

// callback function to avoid duplicating it all over

// Get ONLY ture tradeable stocks
Stocks.find({trades: true }, callback);
// Get all stocks ending with `JS`
Stocks.find({symbol: /JS$/ }, callback);

var callback = function (err, data) {
  if (err) { return console.error(err); }
  else { console.log(data); }
}

//update data
//Model.update(conditions, update, [options], [callback])
//Model.findByIdAndUpdate(id, [update], [options], [callback])
//Model.findOneAndUpdate([conditions], [update], [options], [callback])
Stocks.update({symbol: 'NODEJS'}, {trades: false}, {multi: true}, callback)
Stocks.findOneAndUpdate({symbol: 'ADBE'}, {open: '98'}, callback)

//remove/delete data
//Model.remove(conditions, [callback])
//Model.findByIdAndRemove(id, [options], [callback])
//Model.findOneAndRemove(conditions, [options], [callback])
Stocks.remove({symbol: 'ADBE'}, callback)

//Routes
Stocks.methods(['get', 'put', 'post', 'delete']);
Stocks.register(router, '/stocks');

//return router
module.exports = router;