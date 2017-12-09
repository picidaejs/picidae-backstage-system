/**
 * @file: fileToTree
 * @author: Cuttle Cong
 * @date: 2017/12/9
 * @description:
 */

const fs = require('fs')
const nps = require('path')

const ruleMatch = require('./ruleMatch')

function filesToTree(root, file, options = {}) {
  const { filter = () => true, stat: withStat = false } = options
  if (!fs.existsSync(file)) throw new Error('Not found file: ' + file)
  let stat = fs.statSync(file)
  let extra = withStat ? { stat } : {}
  if (stat.isFile()) {
    if (ruleMatch(filter, file)) {
      return Object.assign({
        type: 'file',
        file: file.substring(root.length).replace(/^\//, ''),
      }, extra)
    }
  }
  else {
    let files = fs.readdirSync(file)
    files = files.map(f => filesToTree(file, nps.join(file, f), filter)).filter(Boolean)

    return Object.assign({
      type: 'dir',
      file: file.substring(root.length).replace(/^\//, ''),
      files
    }, extra)
  }
}


function file2Tree(root, options) {
  root = nps.resolve(root)
  let tree = filesToTree(root, root, options)
  if (!tree) return tree
  tree.file = root
  return tree
}

module.exports = file2Tree
