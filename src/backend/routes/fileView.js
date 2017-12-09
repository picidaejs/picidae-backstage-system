/**
 * @file: user
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description:
 */

const Router = require('koa-router')
const nps = require('path')

const fileToTree = require('../lib/fileToTree')
const { root } = require('../lib/context')



const router = new Router()
router
  .get('/get', async ctx => {
    const data = fileToTree(root)
    data.file = nps.basename(data.file)
    ctx.h.success(data)
  })
  .get('/add_export')

module.exports = router