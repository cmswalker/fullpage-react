
const path = require('path');
const webpack = require('webpack');

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';

console.log('BUILDING WEBPACK FOR ENV', ENV, isProduction);

const config = {
  context: __dirname, // string (absolute path!)

  entry: {
    index: path.join(__dirname, 'src/index.js')
  },

  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'js'),
    publicPath: '/js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      },
      {
       test: /\.styl$/,
       use: [ 'style-loader', 'css-loader', 'stylus-loader' ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/
        ],
        loader: 'babel-loader'
      }
    ]
  },

  target: 'web', // enum
  stats: 'errors-only',

  devServer: {
    port: 3030,
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    // hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
  },

  plugins: [],
  // Don't follow/bundle these modules, but request them at runtime from the environment
  externals: [],

  devtool: 'source-map'
}

if (isProduction) {
  // config.plugins.push(
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: true,
  //     comments: false,
  //     sourceMap: true
  //   })
  // );
} else {

}

console.log('config', config);

module.exports = config;
