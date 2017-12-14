/**
 * @file: webpack.config.dev.js
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description:
 */
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  devServer: {
    overlay: true,
    historyApiFallback: true,
    hot: true,
    proxy: [
      {
        context: ['/acejs', '/api'],
        target: 'http://localhost:3000'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin()
  ]
}