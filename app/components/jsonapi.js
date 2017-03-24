var React = require('react');
var axios = require('axios');
var styles = require('./jsonapi.css');
var collapseStyles = {
    open: {
      display: 'inherit'
    },
    closed: {
      display: 'none'
    }
}

var JsonApp = React.createClass({

      getInitialState: function() {
        return {
            stocks: [],
            active: false
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

      handleClick: function() {
        if (this.state.active) {
          this.setState({
            active: false
          })
        } else {
          this.setState({
            active: true
          })
        }
      },


      render: function() {
        var stateStyle = this.state.active ? collapseStyles.open : collapseStyles.closed;

        return (
            <div className="container">
                <br />
                <button onClick={this.handleClick} className={"btn btn-success"}>Toggle Details</button>
                  <div className="list-group">

                     <br />
                     {this.state.stocks.map(function(data, index) {

                           return (
                              <div className={"list-group-item list-group-item-action flex-column align-items-start" + (index === 0 ? " active" : " ")} key={index}>

                                <div className={"d-flex w-100 justify-content-between "} >
                                  <h5 className="mb-1">Stock Symbol:  <span className={styles.symbolName}>{data.symbol}</span></h5>
                                  <small>0 shares</small>
                                </div>

                                <div style={stateStyle}>
                                    <small>Open Price: {data.open}</small>&nbsp;
                                    <small>Highest Price: {data.high}</small>&nbsp;
                                    <small>Lowest Price: {data.low}</small>&nbsp;
                                    <small>All Price: {(data.low + data.high).toFixed(2)}</small>&nbsp;
                                    <small>Volume: {data.volume}</small>&nbsp;
                                    <small>Average Volume: {data.average_volume}</small>&nbsp;
                                    <small>Volatility: {data.volatility}</small>
                                </div>

                              </div>
                           )
                        }.bind(this))}
                  </div>
          </div>

        )
      }
})

module.exports = JsonApp;