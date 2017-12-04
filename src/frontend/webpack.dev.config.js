/**
 * @file: webpack.config.dev.js
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description:
 */
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractLess = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  devtool: 'source-map',
  devServer: {},
  loader: {},
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(),
    extractLess.extract({
      use: [
        { loader: 'css-loader' }
      ]
    })
  ]
}