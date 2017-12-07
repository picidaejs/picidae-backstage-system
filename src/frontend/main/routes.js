/**
 * @file: routes
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description: 
 */
import Layout from '@comps/Layout'


module.exports = {
  path: '/',
  component: Layout,
  indexRoute: {
    getComponent(location, callback) {
      require.ensure([], () => {
        callback(null, require('@pages/Home').default)
      })
    }
  },
  childRoutes: [
  ]
}