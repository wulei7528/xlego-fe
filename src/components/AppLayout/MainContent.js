import React from 'react'
import { Switch, Route, Redirect } from 'dva/router'

import { menuList, getRouteData } from '../../models/menuData'

function generateRoutes(menuList) {
  const routeData = getRouteData(menuList)

  return routeData.map(item => <Route key={item.key} path={item.path} exact component={item.component} />)
}

function MainContent() {
  return (
    <Switch>
      {generateRoutes(menuList)}
      <Redirect exact from="/" to="/company" />
    </Switch>
  )
}

export default MainContent
