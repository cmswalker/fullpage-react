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
    filename: '[name].bundle.js',
    path: path.join(__dirname, '/js/'),
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
    port: 3030
  },

  plugins: [],

  devtool: 'source-map'
}

if (isProduction) {
  // Don't follow/bundle these modules, but request them at runtime from the environment
  config.externals = ['react', /^@angular\//];
  config.entry = {
    index: path.join(__dirname, 'lib/index.js')
  }
} else {

}

module.exports = config;
