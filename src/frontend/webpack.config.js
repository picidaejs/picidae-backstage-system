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
      ].filter(Boolean),
      vendor: [
        'react', 'react-router', 'react-dom',
        'classnames', '@fe/utils/fetch'
      ]
    },
    output: {
      path: nps.join(__dirname, '../../dist/frontend'),
      filename: '[name]-bundle-[hash:6].js',
      chunkFilename: '[name]-[chunkhash:6].js'
    },
    resolve: {
      alias: {
        '@fe': nps.join(__dirname, 'node_modules/@fe')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        fetch: '@fe/utils/fetch'
      }),
      new ExtractTextPlugin({
        filename: '[name].[contenthash:6].css',
        disable: !IS_PROD_ENV
      }),
      // TODO: DLL
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'common'],
        filename: '[name]-[hash:6].js'
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   deepChildren: true,
      //   children: true,
      //   minChunks: Infinity,
      //   names: ['vendor'],
      //   filename: '[name]-[hash:6].js'
      // }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        hash: false,
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