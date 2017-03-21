var React = require('react');
var axios = require('axios');

var JsonApp = React.createClass({

      getInitialState: function() {
        return {
          stocks: []
        }
      },

      componentDidMount: function() {
        var _this = this;

        this.serverRequest =
          axios
            .get("http://localhost:8080/api/stocks")
            .then(function(result) {
              _this.setState({
                stocks: result.data
              });
            })
      },

      componentWillUnmount: function() {
        this.serverRequest.abort();
      },

      render: function() {
        return (
          <div>
             <br />

             {this.state.stocks.map(function(data, index) {
                   return (

                      <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">Stock Symbol: {data.symbol}</h5>
                          <small>0 shares</small>
                        </div>
                        <small>Open Price: {data.open}</small>
                        <small>Highest Price: {data.high}</small>
                        <small>Lowest Price: {data.low}</small>
                        <small>Volume: {data.volume}</small>
                        <small>Average Volume: {data.average_volume}</small>
                        <small>Volatility: {data.volatility}</small>
                      </a>

                   )
                })}
          </div>
        )
      }
})

module.exports = JsonApp;
