/**
 * @file: createElement
 * @author: Cuttle Cong
 * @date: 2017/12/4
 * @description: 
 */
import React from 'react'
import nprogress from 'nprogress'

export default function createElement(Component, props) {
  nprogress.done()
  return React.createElement(Component, props)
}