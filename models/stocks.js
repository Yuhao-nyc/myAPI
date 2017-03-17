
//few dependecies
var restful = require('node-restful');
var mongoose = restful.mongoose;  //extending of mongoose


//schema
//data types: String Boolean Date Array Number ObjectId Mixed Buffer
var stockSchema = new mongoose.Schema({
    symbol: String,
    open: Number,
    high: Number,
    low: Number,
    volume: String,
    average_volume: String,
    volatility: String,
    updated_at: {type: Date, default: Date.now}
})

module.exports = restful.model('Products', stockSchema);

console.log('stock api is up and running!')