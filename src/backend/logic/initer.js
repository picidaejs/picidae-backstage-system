/**
 * @file: initer
 * @author: Cuttle Cong
 * @date: 2017/12/9
 * @description: 
 */
const nps = require('path')
const context = require('../lib/context')

context.__assign({
  // root: nps.join(__dirname, '../..')
  root: nps.join(__dirname, '../test/fixture/root')
})