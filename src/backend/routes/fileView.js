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

function tree2UI(tree) {
  if (!tree) return
  if (Array.isArray(tree)) {
    return tree.map(tree2UI)
  }
  const { file, type, files, ...rest } = tree
  return {
    ...rest,
    module: file,
    leaf: type === 'file' ? true : void 0,
    children: tree2UI(files)
  }
}

module.exports =
  new Router()
    .get('/get', async ctx => {
      let data = ctx.session.tree
      if (!data) {
        data = fileToTree(root)
        data.file = nps.basename(data.file)
        data = tree2UI(data)
      }
      ctx.h.success(data)
    })
    .post('/set', async ctx => {
      const data = ctx.request.body
      ctx.session.tree = data
      ctx.h.success('data is setting successfully')
    })
