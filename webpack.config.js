/* webpack configureation */


var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',  // filepath to the current HTML file, the one that you're trying to copy and move
    filename: 'index.html',   //name of the newly created HTML file
    inject: 'body'
});

module.exports = {
    /*
    What JavaScript file it should transform.
    Which transformations it should use on that file.
    Where the new, transformed file should go.
    */

    entry: __dirname + '/app/index.js',

    module: {
        loaders: [
          {
           test: /\.js$/,  //which files will be affected?
           exclude: /node.modules/,
           loader: 'babel-loader', //what transformations?
           query: {
              presets: ['react']
           }
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules&importLoaders=1'
          }
        ]
    },

    output: {
      filename: 'transformed.js',
      path: __dirname + '/build'
    },

    //watch: true,

    plugins: [HTMLWebpackPluginConfig]
};

