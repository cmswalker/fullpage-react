const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';

console.log('BUILDING WEBPACK FOR ENV', ENV);

const config = {
  context: __dirname, // string (absolute path!)

  entry: {
    index: path.join(__dirname, 'src/index.js')
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/js/'),
    publicPath: '/',
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
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    // hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
  },

  plugins: []
}

if (isProduction) {
  config.devtool = 'source-map';
  // Don't follow/bundle these modules, but request them at runtime from the environment
  config.externals = ['react', /^@angular\//];
  config.entry = {
    index: path.join(__dirname, 'lib/index.js')
  }
} else {
  config.plugins.push(new HtmlwebpackPlugin({
    title: 'Fullpage React'
  }));
}

module.exports = config;
