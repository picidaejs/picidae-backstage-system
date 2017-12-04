/**
 * @file: webpack.config.js
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description: 
 */
var nps = require('path')

var customizedConfig =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.prod.config') : require('./webpack.dev.config')

module.exports = Object.assign(
  {
    output: {
      path: nps.join(__dirname, '../../dist/frontend'),
      filename: '[path][name]-bundle-[chunkhash].js',
      chunkFilename: '[path][name]-[chunkhash].js'
    }
  },
  customizedConfig
)