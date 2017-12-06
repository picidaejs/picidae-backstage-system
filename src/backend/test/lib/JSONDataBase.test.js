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

  it('should the data equals special object', async function () {
    db = new JSONDataBase(nps.join(fixturePath, 'db.json'))
    const data = ['hello', 'world', new Date().getTime()]
    db.data = data
    await db.save()

    db.getData().should.be.eql(data)
  })
})
