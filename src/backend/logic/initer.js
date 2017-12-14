/**
 * @file: initer
 * @author: Cuttle Cong
 * @date: 2017/12/9
 * @description:
 */
const nps = require('path')
const mkdirp = require('mkdirp')
const context = require('../lib/context')
const { path } = require('./config')

mkdirp.sync(path.runtime)

context.__assign({
  // root: nps.join(__dirname, '../..')
  root: nps.join(__dirname, '..')
})