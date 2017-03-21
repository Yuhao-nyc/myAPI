var React = require('react');
var ReactDOM = require('react-dom');
var JsonApp = require('./components/jsonapi.js');

var ApirenderApp = React.createClass({
    render: function() {
        return (
            <div>
                 <JsonApp />
            </div>
        )
    }
})

ReactDOM.render(
    <ApirenderApp />,
    document.getElementById('app')
)