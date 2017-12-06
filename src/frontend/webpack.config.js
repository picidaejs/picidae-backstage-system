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
console.log('IS_PROD_ENV', IS_PROD_ENV)
console.log('BABEL_ENV', process.env.BABEL_ENV)
var customizedConfig =
      IS_PROD_ENV ? require('./webpack.prod.config') : require('./webpack.dev.config')

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
    resolve: {
      alias: {
        '@pages': nps.join(__dirname, 'node_modules/@pages'),
        '@utils': nps.join(__dirname, 'node_modules/@utils'),
        '@comps': nps.join(__dirname, 'node_modules/@comps')
      }
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        disable: !IS_PROD_ENV
      }),
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
          use: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader', options: { minimize: true } },
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
          use: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader', options: { minimize: true } },
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