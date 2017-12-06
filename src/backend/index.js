/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description:
 */

const Koa = require('koa')
const serve = require('koa-static')
const mount = require('koa-mount')
const send = require('koa-send')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()
const swaggerUiAssetPath = require('./public/swagger-ui-dist').getAbsoluteFSPath()


app.use(bodyParser())
// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.accepts('application/json')
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.response.status} ${ctx.url} - ${ms}ms`)
})

// index route
router.get('/', async (ctx, next) => {
  ctx.body = {
    data: 'Hello World',
    code: 200
  }
  await next()
})
app.use(router.routes())

/* START 静态资源路由 */
const swaggerAssert = serve(swaggerUiAssetPath, {
  gzip: true
})
app
  .use(
    async (ctx, next) => {
      if (ctx.path === '/swagger') {
        ctx.redirect('/swagger/')
      }
      await next()
    }
  )
  .use(mount('/swagger', swaggerAssert))
  .use(
    mount('/swagger/api-swagger.yaml',
      async ctx => {
        await send(ctx, 'api-swagger.yaml', { root: __dirname })
      }
    )
  )
/* END 静态资源路由 */

/* START 通用中间件加载 */
app.use(async (ctx, next) => {
  ctx.h = {
    json(code, data) {
      ctx.body = { code, data }
      ctx.response.status = code
    }
  }
  await next()
})
/* END 通用中间件加载 */

/* START 业务逻辑路由加载 */
const routes = require('./routes/index')
routes.prefix('/api')

app.use(routes.routes())
/* END 业务逻辑路由加载 */

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log('Server run on Port: %d', port)
})

module.exports = {
  address: `http://localhost:${port}`,
  stop: () => server.close()
}
