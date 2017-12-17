/**
 * @file: user
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description:
 */

const Router = require('koa-router')
const nps = require('path')

const fileToTree = require('../lib/fileToTree')
const fs = require('../lib/fs')
const { root } = require('../lib/context')
const { treeEmbedIdentifier } = require('@common/tree-helper')

const ROOT_DIRNAME = nps.dirname(root)

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

function getAbsolutePath(path) {
  return nps.join(ROOT_DIRNAME, path)
}

async function getFileContent(identifier) {
  const filename = getAbsolutePath(identifier)
  if (fs.isFile(filename)) {
    return await fs.readFileAsync(filename, { encoding: 'utf8' })
  }
  return null
}

module.exports =
  new Router()
    .get('/get', async ctx => {
      let data = ctx.session.fileTreeData
      if (!data) {
        const options = { filter: filename => !/\/node_modules\//.test(filename) }
        let tree = fileToTree(root, options)
        tree.file = nps.basename(tree.file)
        tree = tree2UI(tree)
        data = tree
      }
      data = treeEmbedIdentifier(data)
      ctx.h.success(data)
    })
    .post('/set', async ctx => {
      const data = ctx.request.body
      ctx.session.fileTreeData = data
      ctx.h.success('data is setting successfully')
    })
    .get('/exact/:path', async ctx => {
      const { path } = ctx.params
      if (!path) {
        ctx.response.status = 404
      }
      else {
        const filename = getAbsolutePath(path)
        if (fs.isFile(filename)) {
          await ctx.send(filename, { root: '/' })
        } else {
          ctx.response.status = 204
          ctx.body = null
        }
      }
    })
    .get('/spec', async ctx => {
      const { identifier } = ctx.query
      if (!identifier) {
        ctx.h.fail('identifier is not preset')
      }
      else {
        ctx.h.success(await getFileContent(decodeURIComponent(identifier)))
      }
    })
