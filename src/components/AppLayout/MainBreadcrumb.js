import React from 'react'
import { Breadcrumb } from 'antd'
import { withRouter } from 'dva/router'
import * as Constants from '../../core/constants'

function MainBreadcrumb({ location }) {
  const { pathname } = location
  const paths = pathname.split('/')

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <span>当前所在的位置> </span>
      {paths.map(path => path && <Breadcrumb.Item key={path}>{Constants.pathMap[path]}</Breadcrumb.Item>)}
    </Breadcrumb>
  )
}

export default withRouter(MainBreadcrumb)
