/**
 * @file: webpack.config.prod.js
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description: 
 */
var nps = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  output: {
    path: nps.join(__dirname, '../../dist/frontend'),
    filename: '[path][name]-bundle-[chunkhash].js',
    chunkFilename: '[path][name]-[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common', 'common-[chunkhash].js'),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        },
        warnings: false,
        output: {
          comments: false,
          beautify: false
        }
      }
    })
  ]
}