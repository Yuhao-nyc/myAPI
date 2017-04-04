var React = require('react');

var StockPanel = React.createClass({

      render: function() {
        return (
                                      <div className={"d-flex w-100 justify-content-between"}>
                                        <h5 className="mb-1" onClick={this.handleToggle}><span className={styles.symbolTitle}>Stock Symbol:</span> <span className={styles.symbolName}>{data.symbol}</span> ${data.price}</h5>
                                        <small>
                                          {this.state.shares}&nbsp;
                                          <span className={styles.colorGrey}>shares</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                          <button type="button" className={"btn btn-outline-success btn-sm "+ styles.btnTrans +""} onClick={this.handleBuy}>Buy</button>&nbsp;&nbsp;
                                          <button type="button" className={"btn btn-outline-danger btn-sm "+ styles.btnTrans +""} onClick={this.handleSell}>Sell</button>
                                        </small>
                                      </div>
        )
      }
})

module.exports = StockPanel;