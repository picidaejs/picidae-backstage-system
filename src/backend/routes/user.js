/**
 * @file: user
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description:
 */

const Router = require('koa-router')

const router = new Router()
router
  .post('/login', async (ctx) => {
    const { username, password } = ctx.request.body
    if (username === 'imcuttle' && password === 'imcuttle') {
      ctx.h.success('login success!')
    }
    else {
      ctx.h.fail('login failed')
    }
  })

module.exports = router