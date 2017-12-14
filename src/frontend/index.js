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
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import { useStrict } from 'mobx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import '@fe/assets/style/index.less'
import createElement from './utils/createElement'
import wrapRoutes from './utils/wrapRoutes'
import GlobalState from './main/GlobalState'

useStrict(true)
console.debug = process.env.NODE_ENV === 'development'
  ? console.log.bind(console, '@debug')
  : console.log

const globalState = new GlobalState()
let key = 0
function appStart() {
  const routes = require('!@rd/async-router-loader!./main/routes')
  const ctxProps = {
    routes: wrapRoutes(routes),
    createElement,
    history: createHashHistory()
  }
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Provider globalState={globalState}>
          <Router key={key++} {...ctxProps} />
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    document.querySelector('#root')
  )
}

appStart()
if (module.hot) {
  module.hot.accept(['./main/routes'], appStart)
}