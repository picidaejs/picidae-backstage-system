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
      ctx.h.json(200, 'login success!')
    }
    else {
      ctx.h.json(502, 'login failed')
    }
  })
  .post('/add_export')

module.exports = router