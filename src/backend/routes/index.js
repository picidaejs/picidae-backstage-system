/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description: 
 */

const Router = require('koa-router')
const userRoute = require('./user')

const router = new Router()

userRoute.prefix('/user')
router.use(userRoute.routes())

module.exports = router

