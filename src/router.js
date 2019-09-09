import React from 'react'
import { Router, Route } from 'dva/router'
import App from './App'

import 'antd/dist/antd.css'

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  )
}
