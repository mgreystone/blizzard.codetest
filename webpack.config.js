'use strict'

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var cssLoaderBase = 'css?sourceMap!autoprefixer?browsers=last 2 versions'

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: 'source-map',

  entry: {
    app: './index'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[hash].js'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional=runtime'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', cssLoaderBase + '!sass?sourceMap')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', cssLoaderBase)
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  externals: {
    se: 'SE'
  },

  plugins: [
    new ExtractTextPlugin('[hash].css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      title: 'Blizzard Code Test'
    })
  ]
}
