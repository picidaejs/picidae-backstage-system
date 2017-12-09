/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/12/5
 * @description: 
 */

const Router = require('koa-router')
const userRoute = require('./user')
const fileViewRoute = require('./fileView')

const router = new Router()

userRoute.prefix('/user')
router.use(userRoute.routes())

fileViewRoute.prefix('/fileView')
router.use(fileViewRoute.routes())

module.exports = router

