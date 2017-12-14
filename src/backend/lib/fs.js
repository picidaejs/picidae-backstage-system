/**
 * @file: jsonDataBase
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description:
 */

const fs = require('fs')
const nps = require('path')
const ruleMatch = require('./ruleMatch')

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('path must be type of `String`.')
  }
}

fs.isFile = function (path) {
  assertPath(path)
  return fs.existsSync(path) && fs.lstatSync(path).isFile()
}

fs.isDirectory = function (path) {
  assertPath(path)
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory()
}

fs.writeFileAsync = async function (path, data, options) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, function (err) {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

fs.readFileAsync = async function (path, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

fs.walk = function (filename, options = {}) {
  const { filter = () => true, filterDir = () => true, action } = options
  if (!fs.isDirectory(filename)) {
    throw new Error(`${filename} is not an directory`)
  }

  filename = nps.resolve(filename)
  const paths = fs.readdirSync(filename)
  paths.forEach(name => {
    let fullname = nps.join(filename, name)
    if (fs.isFile(fullname)) {
      if (ruleMatch(filter, fullname)) {
        typeof action === 'function' && action(fullname, 'file')
      }
    } else {
      typeof action === 'function'
        && ruleMatch(filterDir, fullname) && action(fullname, 'dir')
      fs.walk(fullname, options)
    }
  })
}

module.exports = fs