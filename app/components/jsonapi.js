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

var NoticeBox = React.createClass({
    render: function() {
        return (
            <div className="alert alert-success" role="alert">
                  <strong>Congratulations!</strong> You have bought {this.props.sharesBought} shares.
            </div>
        )
    }
})

var AlertBox = React.createClass({
    render: function() {
        return (
            <div className={"alert alert-danger "+ styles.alertBox +""} role="alert">
                You have sold all you shares
                <br />
            </div>
        )
    }
})


var JsonApp = React.createClass({

      getInitialState: function() {
        return {
            stocks: [],
            active: false,
            shares: 0,
            sharesBought: 0,
            sharesSold: 0,
            symbol: 'BABA' //TODO
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

      handleToggle: function() {
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

      handleBuy: function() {
         var owned_shares = this.state.shares + 1;

         this.setState({shares: owned_shares});

         if (owned_shares < 0) {
           alert('you already sold all you shares!!!')
           this.setState({shares: 0});
         }
         console.log('boughted '+ owned_shares +' share')
      },

      handleSell: function() {
         var owned_shares = this.state.shares;

         this.setState({shares: owned_shares -1});

         if (owned_shares < 1) {
           alert('you already sold all you shares!!!')
           this.setState({shares: 0});

         }
         console.log('sold '+ this.state.shares +' share')
      },


      render: function() {
        var stateStyle = this.state.active ? collapseStyles.open : collapseStyles.closed;

        return (
            <div className="container">
                <br />
                <button onClick={this.handleToggle} className={"btn btn-info "+ styles.btnTrans +""}>View All</button>

                <br /> <br />
                <NoticeBox sharesBought={this.state.shares} symbolBought={this.state.symbol}/>

                <AlertBox alertContent={this.state.content} />
                  <div className="list-group">

                     {this.state.stocks.map(function(data, index) {

                           return (
                              <div className={"list-group-item list-group-item-action flex-column align-items-start"} key={index}>

                                <div className={"d-flex w-100 justify-content-between"}>
                                  <h5 className="mb-1" onClick={this.handleToggle}><span className={styles.symbolTitle}>Stock Symbol:</span> <span className={styles.symbolName}>{data.symbol}</span> ${data.price}</h5>
                                  <small>
                                    {this.state.shares}&nbsp;
                                    <span className={styles.colorGrey}>shares</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="button" className={"btn btn-outline-success btn-sm "+ styles.btnTrans +""} onClick={this.handleBuy}>Buy</button>&nbsp;&nbsp;
                                    <button type="button" className={"btn btn-outline-danger btn-sm "+ styles.btnTrans +""} onClick={this.handleSell}>Sell</button>
                                  </small>
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