var React = require('react');
var ReactDOM = require('react-dom');
var JsonApp = require('./components/jsonapi');
var NavBar = require('./components/navbar');

var ApirenderApp = React.createClass({
    render: function() {
        return (
            <div>
                 <NavBar />

                 <JsonApp />
            </div>
        )
    }
})

ReactDOM.render(
    <ApirenderApp />,
    document.getElementById('app')
)