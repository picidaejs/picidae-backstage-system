/**
 * @file: JSONDataBase.test.js
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description:
 */

const JSONDataBase = require('../../lib/JSONDataBase')
const nps = require('path')
const fixturePath = nps.join(__dirname, '../fixture')

require('should')

/* eslint-disable no-unused-vars */
let db

function requireLatest(path) {
  path = require.resolve(path)
  delete require.cache[path]
  return require(path)
}

describe('JSONDataBase', function () {
  it('should throw not exist `path` error', function () {
    try {
      db = new JSONDataBase()
    } catch (ex) {
      ex.should.be.instanceof(TypeError)
    }
  })

  it('should throw `path` is regarded as directory error', function () {
    try {
      db = new JSONDataBase(fixturePath)
    } catch (ex) {
      ex.should.be.instanceof(Error)
    }
  })

  it('should the data equals {}', function () {
    db = new JSONDataBase(nps.join(fixturePath, 'error-format-db.json'))
    db.getData().should.be.eql({})
  })

  const data = {
    k: ['hello', 'world', new Date().getTime()],
    str: ['str']
  }
  it('should the data equals special object', async function () {
    db = new JSONDataBase(nps.join(fixturePath, 'db.json'))
    db.set('key', data)
    db.get('key').should.be.eql({ ...data, $id: 'key' })
  })

  it('should find only the one item', function () {
    db.find({ str: ['str'] }).should.be.eql({ ...data, $id: 'key' })
  })

  it('should find all matched items', function () {
    db.set('key2', { str: ['str'] })
    const expect = [
      { ...data, $id: 'key' },
      { str: ['str'], $id: 'key2' }
    ]
    db.findAll({ str: ['str'] }).should.be.eql(expect)
    db.delete('key2')
  })

  it('should the content of db file be equals', async function () {
    await db.save({ beautify: false })
    const expect = {
      dict: { key: data },
      order: ['key']
    }
    requireLatest(nps.join(fixturePath, 'db.json')).should.eql(expect)
  })

  it('should delete the db data of `key`', async function () {
    db.delete('key')
    db.has('key').should.false()

    await db.save({ beautify: false })
    const expect = {
      dict: {},
      order: []
    }
    requireLatest(nps.join(fixturePath, 'db.json')).should.eql(expect)
  })

})
