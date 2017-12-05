/**
 * @file: sample
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description:
 */

const doc = require('test2doc')
const request = require('supertest-test2doc')(require('supertest'))
const nps = require('path')

require('should')

// For Koa, you should exports app.listen() or app.callback() in your app entry
process.env.PORT = 3001
const { address, stop } = require('../../index')

after(function () {
  doc.emit(nps.join(__dirname, '../../api-swagger.yaml'), 'swagger')
  stop()
})

describe('#Home', function () {
  doc.group('Home').is(doc => {
    doc.action('Home Test').is(doc => {
      it('should get hello world', function () {
        return request(address)
          .with(doc)
          .get('/')
          .expect(200)
          .then(res => {
            res.body.desc('Text about Hello world').should.not.be.empty()
            res.body.should.have.properties('data', 'code')
            res.body.code.desc('status').should.be.a.Number()
            res.body.data.desc('data').should.eql('Hello World')
          })
      })
    })
  })
})
