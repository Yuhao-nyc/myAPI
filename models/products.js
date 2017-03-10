
//few dependecies
var restful = require('node-restful');
var mongoose = restful.mongoose;  //extending of mongoose


//schema
var productSchema = new mongoose.Schema({
    name: String,
    sku: String,
    price: Number,
    year: Number,
    financing: String
})

module.exports = restful.model('Products', productSchema);

console.log('product api is running !')
