/**
 * @file: JSONDataBase.test.js
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description:
 */

const ruleMatch = require('../../lib/ruleMatch')

require('should')

describe('ruleMatch', function () {
  it('should match the correct rule: RegExp', function () {
    ruleMatch(/^abc$/, 'abc').should.true()
  })

  it('should match the correct rule: String', function () {
    ruleMatch('^abc$', 'abc').should.true()
  })

  it('should match the correct rule: Function', function () {
    ruleMatch(val => 'abc' === val, 'abc').should.true()
  })

  it('should match the correct rule: Array', function () {
    ruleMatch([val => 'abc' === val], 'abc').should.true()
  })

})
