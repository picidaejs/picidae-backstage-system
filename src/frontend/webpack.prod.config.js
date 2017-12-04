/**
 * @file: webpack.config.prod.js
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description:
 */
var webpack = require('webpack')


module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
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