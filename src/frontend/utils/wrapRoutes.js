/**
 * @file: createElement
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description: 
 */
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

function registerOnEnter(route) {
  const onEnter = route.onEnter
  route.onEnter = function () {
    if (typeof document !== 'undefined') {
      nprogress.start()
    }
    onEnter && onEnter.apply(null, arguments)
  }
  if (route.indexRoute) {
    registerOnEnter(route.indexRoute)
  }
  if (route.childRoutes) {
    route.childRoutes.forEach(registerOnEnter)
  }
}

export default function warpRoutes(routes) {
  if (!Array.isArray(routes)) {
    routes = [routes]
  }
  routes.forEach(registerOnEnter)

  return routes
}

