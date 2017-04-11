var React = require('react');  

var navBar = React.createClass({
    render: function() {
        return (
            <div>
               <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <div className="container">
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <a className="navbar-brand" href="#">Stocks App API</a>

                  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-md-0">
                      <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Download</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link disabled" href="#">Coming Soon...</a>
                      </li>
                    </ul>

                  </div>
                 </div>
                </nav>
           </div>
        )
    }
})

module.exports = navBar;