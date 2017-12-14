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
const { getActiveNode, treeEmbedIdentifier } = require('@common/tree-helper')

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

async function getFileContent(identifier) {
  const filename = nps.join(ROOT_DIRNAME, identifier)
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
      const active = getActiveNode(data)
      let fileContent = false
      if (active) {
        fileContent = await getFileContent(active.identifier)
      }
      // data.tree = treeEmbedIdentifier(data.tree)
      ctx.h.success({ tree: data, fileContent })
    })
    .post('/set', async ctx => {
      const data = ctx.request.body
      ctx.session.fileTreeData = data
      ctx.h.success('data is setting successfully')
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
