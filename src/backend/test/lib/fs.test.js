/**
 * @file: JSONDataBase.test.js
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description:
 */

const fs = require('../../lib/fs')
const nps = require('path')
const fixturePath = nps.join(__dirname, '../fixture')

require('should')

describe('fs', function () {
  it('fs.walk', function () {
    const options = {
      filter: /b\.txt$/,
      action: function(fullname, type) {
        type === 'file'
        && fullname.should.endWith('root/b/b.txt')
      }
    }
    fs.walk(nps.join(fixturePath, 'root'), options)
  })
})
