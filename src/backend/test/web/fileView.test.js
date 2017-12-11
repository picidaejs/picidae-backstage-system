/**
 * @file: user
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description:
 */

const doc = require('test2doc')
const request = require('supertest-test2doc')(require('supertest'))
const nps = require('path')

require('should')

process.env.PORT = 3001
const { address, stop } = require('../../index')

after(function () {
  doc.emit(nps.join(__dirname, '../../api-swagger.yaml'), 'swagger')
  stop()
})

describe('FileView', function () {
  doc.group('FileView').is(doc => {
    doc.action('get Dir Structure').is(doc => {
      it('get Dir Structure', function () {
        return request(address)
          .with(doc)
          .get('/api/fileView/get')
          .expect(200)
          .then(res => {
            res.body.should.have.properties('data', 'code')
            res.body.code.should.be.a.Number()
            // eslint-disable-next-line no-unused-vars
            const expected = {
              'module': 'root', 'children': [
                {
                  'module': 'a', 'children': [
                    { 'module': 'a-1', 'children': [{ 'module': 'a-1.txt', 'leaf': true }] },
                    { 'module': 'a.txt', 'leaf': true }
                  ]
                },
                {
                  'module': 'b',
                  'children': [{ 'module': 'b.txt', 'leaf': true }]
                }
              ]
            }

            res.body.data.module.should.eql('root')
          })
      })

    })
  })
})
