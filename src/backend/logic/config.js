/**
 * @file: initer
 * @author: Cuttle Cong
 * @date: 2017/12/9
 * @description: 
 */
const nps = require('path')

exports.path = {
  runtime: nps.join(__dirname, '../runtime'),
  public: nps.join(__dirname, '../public'),
  public_Ace: nps.join(__dirname, '../public/acejs')
}
