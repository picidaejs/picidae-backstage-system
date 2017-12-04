/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description:
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { createHashHistory } from 'history'
import { AppContainer } from 'react-hot-loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import '@assets/style/reset.less'
import createElement from './utils/createElement'
import wrapRoutes from './utils/wrapRoutes'

let key = 0
function appStart() {
  const routes = require('./main/routes')
  const ctxProps = {
    routes: wrapRoutes(routes),
    createElement,
    history: createHashHistory()
  }
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Router key={key++} {...ctxProps} />
      </MuiThemeProvider>
    </AppContainer>,
    document.querySelector('#root')
  )
}

appStart()
if (module.hot) {
  module.hot.accept(['./main/routes'], appStart)
}