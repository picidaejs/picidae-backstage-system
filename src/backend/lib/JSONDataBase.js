/**
 * @file: jsonDataBase
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description:
 */

const fs = require('./fs')
const nps = require('path')
const mkdirp = require('mkdirp')
const deepEqual = require('deep-equal')

function getFindFunction(findRule) {
  let findFunc = findRule
  if (typeof findRule === 'object') {
    let keyNames = Object.keys(findRule)
    findFunc = function (item) {
      return keyNames.every(function (key) {
        return deepEqual(item[key], findRule[key], { strict: true })
      })
    }
  }
  return findFunc
}

class JSONDataBase {
  constructor(path) {
    if (typeof path !== 'string') {
      throw new TypeError('path must be `string`')
    }
    path = nps.resolve(path)
    if (fs.isDirectory(path)) {
      throw new Error(`The path: ${path} is regarded as a directory.`)
    }

    mkdirp.sync(nps.dirname(path))
    this.path = path
    try {
      this.data = this.loadDataSync()
    /* eslint-disable no-empty */
    } catch (ex) {
    } finally {
      this._initDataStruction()
    }
    process.on('SIGINT', async () => {
      await this.save()
    })
  }

  loadDataSync() {
    const buffer = fs.readFileSync(this.path)
    return JSON.parse(buffer.toString())
  }

  async save(options = {}) {
    const { beautify } = options
    await fs.writeFileAsync(this.path, JSON.stringify(this.data, null, beautify ? 2 : null))
  }

  getData() {
    return this.data.dict
  }

  _initDataStruction() {
    this.data = this.data || {}
    this.data.dict = this.data.dict || {}
    this.data.order = this.data.order || []
  }

  getOrderIndex(key) {
    return this.data.order.indexOf(key)
  }

  set(key, data) {
    if (!this.has(key)) {
      this.data.order.push(key)
    }
    this.data.dict[key] = data
    return this
  }

  get(key) {
    return this.find({ $id: key })
  }

  has(key) {
    return this.data.dict.hasOwnProperty(key)
  }

  delete(key) {
    delete this.data.dict[key]
    let index = this.getOrderIndex(key)
    if (index >= 0) {
      this.data.order.splice(index, 1)
    }
    return this
  }

  find(findRule) {
    let findFunc = getFindFunction(findRule)
    return this.orderedDict.find(findFunc)
  }

  findAll(findRule) {
    let findFunc = getFindFunction(findRule)
    let res = []
    this.orderedDict.forEach(function (item) {
      if (findFunc(item)) {
        res.push(item)
      }
    })

    return res
  }

  get orderedDict() {
    return this.data.order.map((keyName) => {
      return {
        ...this.data.dict[keyName],
        $id: keyName
      }
    })
  }

}

module.exports = JSONDataBase