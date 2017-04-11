var React = require('react');
var axios = require('axios');

var styles = require('./jsonapi.css');

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


var stockInfo = React.createClass({
      getInitialState: function() {
        return {
            stocks: [],
            active: false,
            shares: 0,
            sharesBought: 0,
            sharesSold: 0,
            symbol: ' ', //TODO,
            owned_shares: 0
        }
      },

      componentDidMount: function() {
        var self = this;

        this.serverRequest =
          axios
            .get("http://localhost:8080/api/stocks")
            .then(function(result) {
              self.setState({
                stocks: result.data
              });
            })
      },

      componentWillUnmount: function() {
        this.serverRequest.abort();
      },

      handleBuy: function(key) {

         //var owned_shares = this.state.shares + 1;
         //this.setState({shares: owned_shares});

         var allRecords = document.querySelectorAll('[data-shares="' + key + '"]');

         allRecords.forEach(function(record) {
            var boughtShares = parseInt(record.innerHTML) + 1;
            //console.log(plusShares);
            return record.innerHTML = boughtShares;
         })

         //console.log('boughted '+ owned_shares +' share')

      },

      handleSell: function(key) {
         //var owned_shares = this.state.shares;
         //this.setState({shares: owned_shares -1});

         var allRecords = document.querySelectorAll('[data-shares="' + key + '"]');

         allRecords.forEach(function(record) {
            if (record.innerHTML <= 0) {
                alert('you have no shares to sell...');
                return record.innerHTML = 0;
            } else {
                var soldShares = parseInt(record.innerHTML) - 1;
                //console.log(plusShares);
                return record.innerHTML = soldShares;
            }
         })

         /*if (owned_shares < 1) {
           alert('you already sold all you shares!!!')
           this.setState({shares: 0});

         }*/
         //console.log('sold '+ this.state.shares +' share')
      },

      handleToggleAll: function() {
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

      toggleDataByKey: function(key) {
        var allKeyRecords = document.querySelectorAll('[data-toggle="' + key + '"]');
            allKeyRecords.forEach(function(record) {
                return record.classList.toggle(styles.stockDetail)
            })
      },

      render: function() {
          var stateStyle = this.state.active ? styles.toggleOpen : styles.toggleClose;
          var self = this;

          return (
              <div>
                  <br />
                  <button onClick={this.handleToggleAll} className={"btn btn-info "+ styles.btnTrans +""}>View All</button>

                  <br /> <br />
                  <NoticeBox sharesBought={this.state.shares} symbolBought={this.state.symbol}/>

                  <AlertBox alertContent={this.state.content} alertStatus={this.state.status}/>

                           {this.state.stocks.map(function(data, index) {

                                 return (
                                    <div className={"list-group-item list-group-item-action flex-column align-items-start"} key={index}>

                                      <div className={"d-flex w-100 justify-content-between"}>
                                        <h5 className="mb-1">
                                            <span className={styles.symbolTitle}>Stock Symbol:</span> <span className={styles.symbolName}>{data.symbol}</span> ${data.price}&nbsp;&nbsp;
                                            <button type="button" className={"btn btn-outline-primary btn-sm "+ styles.btnTrans +""} onClick={self.toggleDataByKey.bind(this, index)}>more...</button>
                                        </h5>
                                        <small>
                                          <span data-shares={index}>0</span>&nbsp;
                                          <span className={styles.colorGrey}>shares</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                          <button type="button" className={"btn btn-outline-success btn-sm "+ styles.btnTrans +""} onClick={self.handleBuy.bind(this, index)}>Buy</button>&nbsp;&nbsp;
                                          <button type="button" className={"btn btn-outline-danger btn-sm "+ styles.btnTrans +""} onClick={self.handleSell.bind(this, index)}>Sell</button>
                                        </small>
                                      </div>

                                      <div className={stateStyle} data-toggle={index}>
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
          )
      }
})

module.exports = stockInfo;