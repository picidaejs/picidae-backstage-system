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

describe('User', function () {
  doc.group('User').is(doc => {
    doc.action('User Login').is(doc => {

      it('should login failed', function () {
        return request(address)
          .with(doc)
          .post('/api/user/login')
          .send({ username: 'foo', password: 'bar' })
          .expect(502)
          .then(res => {
            res.body.should.not.be.empty()
            res.body.should.have.properties('data', 'code')
            res.body.code.should.be.a.Number()
            res.body.data.should.eql('login failed')
          })
      })

      it('should login success!', function () {
        return request(address)
          .with(doc)
          .post('/api/user/login')
          .send({ username: 'imcuttle', password: 'imcuttle' })
          .expect(200)
          .then(res => {
            res.body.desc('Success Body').should.not.be.empty()
            res.body.should.have.properties('data', 'code')
            res.body.code.desc('status').should.be.a.Number()
            res.body.data.desc('broadcast message').should.eql('login success!')
          })
      })

    })
  })
})
