import React from 'react'
import { Router, Route } from 'dva/router'
import { Layout, Breadcrumb, Switch } from 'antd'

// import { menuList } from './models/menuData'

import Layouts from './components/Layout/'

import 'antd/dist/antd.css'

export default function({ history }) {
  return (
    <Router history={history}>
      <Layouts>
        <Switch>
          <Route />
        </Switch>
      </Layouts>
    </Router>
  )
}
