/**
 * @file: webpack.config.dev.js
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description: 
 */
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  devtool: 'source-map',
  devServer: {

  },
  loader: {

  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
  ]
}