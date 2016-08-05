const path = require('path');

module.exports = {
  entry: {
    index: path.join(__dirname, 'index.js')
  },
  output: {
    filename: path.join(__dirname, 'bundle.js')
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
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
    ]
  }
};
