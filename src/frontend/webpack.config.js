/**
 * @file: webpack.config.js
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description:
 */
var nps = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var assign = require('./utils/array-append-assign')

var IS_PROD_ENV = process.env.NODE_ENV === 'production'
var customizedConfig =
      IS_PROD_ENV ? require('./webpack.prod.config') : require('./webpack.dev.config')

var extractLess = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: !IS_PROD_ENV
})
var extractCss = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: !IS_PROD_ENV
})

module.exports = assign(
  {
    entry: {
      'app': [
        !IS_PROD_ENV && 'react-hot-loader/patch',
        './index.js'
      ].filter(Boolean)
    },
    output: {
      path: nps.join(__dirname, '../../dist/frontend'),
      filename: '[name]-bundle-[hash].js',
      chunkFilename: '[name]-[chunkhash].js'
    },
    plugins: [
      extractLess,
      extractCss,
      new webpack.optimize.CommonsChunkPlugin({
        names: ['common'],
        filename: '[name]-[hash].js'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './template.html'
      })
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [__dirname],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        },
        {
          test: /\.less$/,
          use: extractLess.extract({
            use: [
              { loader: 'css-loader' },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins(/*loader*/) {
                    return [
                      require('autoprefixer')(),
                      require('cssnano')()
                    ]
                  }
                }
              },
              { loader: 'less-loader' }
            ],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.css/,
          use: extractCss.extract({
            use: [
              { loader: 'css-loader' },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins(/*loader*/) {
                    return [
                      require('autoprefixer')(),
                      require('cssnano')()
                    ]
                  }
                }
              }
            ],
            fallback: 'style-loader'
          })
        }
      ]
    }
  },
  customizedConfig
)