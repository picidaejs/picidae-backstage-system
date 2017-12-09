/**
 * @file: JSONDataBase.test.js
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description:
 */

const fileToTree = require('../../lib/fileToTree')
const nps = require('path')
const fixturePath = nps.join(__dirname, '../fixture')

require('should')

describe('fileToTree', function () {
  it('the result of fileToTree', function () {
    const actual = fileToTree(
      nps.join(fixturePath, 'root'),
      { withStat: false, relativePath: true }
    )
    actual.file = nps.basename(actual.file)
    actual.should.eql({
      type: 'dir',
      file: 'root',
      files: [
        {
          type: 'dir',
          file: 'a',
          files: [
            {
              type: 'dir',
              file: 'a-1',
              files: [{ type: 'file', file: 'a-1.txt' }]
            },
            { type: 'file', file: 'a.txt' }
          ]
        },
        {
          type: 'dir',
          file: 'b',
          files: [
            { type: 'file', file: 'b.txt' }
          ]
        }
      ]
    })
  })

})
