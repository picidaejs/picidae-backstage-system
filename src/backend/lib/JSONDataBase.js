/**
 * @file: jsonDataBase
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description:
 */

const fs = require('./fs')
const nps = require('path')
const mkdirp = require('mkdirp')

module.exports = class JSONDataBase {
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
    } catch (ex) {
      this.data = {}
    }
    process.on('SIGINT', async () => {
      await this.save()
    })
  }

  loadDataSync() {
    const buffer = fs.readFileSync(this.path)
    return JSON.parse(buffer.toString())
  }

  async loadData() {
    const buffer = await fs.readFileAsync(this.path)
    return JSON.parse(buffer.toString())
  }

  async save(options = {}) {
    const { beautify } = options
    await fs.writeFileAsync(this.path, JSON.stringify(this.data, null, beautify ? 2 : null))
  }

  getData() {
    return this.data
  }



}