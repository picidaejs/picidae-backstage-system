/**
 * @file: ruleMatch
 * @author: Cuttle Cong
 * @date: 2017/12/8
 * @description:
 */

function ruleMatch(rule, value = '') {
  if (rule instanceof RegExp) {
    return !!rule.exec(value.toString())
  } else if (typeof rule === 'string') {
    return !!new RegExp(rule).exec(value.toString())
  } else if (Array.isArray(rule)) {
    return rule.some(eachRule => ruleMatch(eachRule, value))
  } else if (typeof rule === 'function') {
    return rule(value)
  }

  throw new TypeError('the illegal rule of `ruleMatch`')
}

module.exports = ruleMatch