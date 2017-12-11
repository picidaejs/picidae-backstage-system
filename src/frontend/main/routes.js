/**
 * @file: routes
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description: 
 */
// import Layout from '@fe/comps/Layout'


module.exports = {
  path: '/',
  component: 'sync!@fe/comps/Layout',
  indexRoute: {
    component: '@fe/pages/Home'
  },
  childRoutes: [
    {
      path: 'edit',
      component: '@fe/pages/Edit'
    }
  ]
}