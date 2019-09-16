import React from 'react'
import { Router, Route } from 'dva/router'
import dynamic from 'dva/dynamic'

export default function({ history }) {
  return (
    <Router history={history}>
      <Route
        path="/"
        component={dynamic({
          component: () => import('./App'),
        })}
      />
    </Router>
  )
}
