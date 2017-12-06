/**
 * @file: jsonDataBase
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description: 
 */

const fs = require('fs')

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
    fs.readFile(path, options, function (err) {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = fs