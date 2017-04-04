var React = require('react');
var axios = require('axios');

var StockPanel = require('./stockPanel.js');
var StockData = require('./stockData.js');

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
            symbol: ' ' //TODO
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

      handleBuy: function() {
         var owned_shares = this.state.shares + 1;

         this.setState({shares: owned_shares});

         if (owned_shares < 0) {
           alert('you already sold all you shares!!!')
           this.setState({shares: 0});
         }
         //console.log('boughted '+ owned_shares +' share')
      },

      handleSell: function() {
         var owned_shares = this.state.shares;

         this.setState({shares: owned_shares -1});

         if (owned_shares < 1) {
           alert('you already sold all you shares!!!')
           this.setState({shares: 0});

         }
         //console.log('sold '+ this.state.shares +' share')
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
                  <button onClick={this.handleToggle} className={"btn btn-info "+ styles.btnTrans +""}>View All</button>

                  <br /> <br />
                  <NoticeBox sharesBought={this.state.shares} symbolBought={this.state.symbol}/>

                  <AlertBox alertContent={this.state.content} />

                           {this.state.stocks.map(function(data, index) {

                                 return (
                                    <div className={"list-group-item list-group-item-action flex-column align-items-start"} key={index}>

                                      <div className={"d-flex w-100 justify-content-between"}>
                                        <h5 className="mb-1">
                                            <span className={styles.symbolTitle}>Stock Symbol:</span> <span className={styles.symbolName}>{data.symbol}</span> ${data.price}&nbsp;&nbsp;
                                            <button type="button" className={"btn btn-outline-primary btn-sm "+ styles.btnTrans +""} onClick={self.toggleDataByKey.bind(this, index)}>more...</button>
                                        </h5>
                                        <small>
                                          {this.state.shares}&nbsp;
                                          <span className={styles.colorGrey}>shares</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                          <button type="button" className={"btn btn-outline-success btn-sm "+ styles.btnTrans +""} onClick={this.handleBuy}>Buy</button>&nbsp;&nbsp;
                                          <button type="button" className={"btn btn-outline-danger btn-sm "+ styles.btnTrans +""} onClick={this.handleSell}>Sell</button>
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