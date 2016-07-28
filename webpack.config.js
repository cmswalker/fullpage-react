const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, '/examples/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/static/'),
    publicPath: '/',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Full Page'
    })
  ]
};
