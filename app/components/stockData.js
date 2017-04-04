var React = require('react');

var StockData = React.createClass({

      render: function() {
        return (
                                      <div style={stateStyle}>
                                          <small>Open Price: {data.open}</small>&nbsp;
                                          <small>Highest Price: {data.high}</small>&nbsp;
                                          <small>Lowest Price: {data.low}</small>&nbsp;
                                          <small>All Price: {(data.low + data.high).toFixed(2)}</small>&nbsp;
                                          <small>Volume: {data.volume}</small>&nbsp;
                                          <small>Average Volume: {data.average_volume}</small>&nbsp;
                                          <small>Volatility: {data.volatility}</small>
                                      </div>

        )
      }
})

module.exports = StockData;