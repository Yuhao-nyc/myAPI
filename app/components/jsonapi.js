var React = require('react');
var StockInfo = require('./stockInfo.js')

var JsonApp = React.createClass({

      render: function() {
        return (
            <div className="container">
                <div className="list-group">
                    <StockInfo />
                </div>   
            </div>

        )
      }
})

module.exports = JsonApp;