import React from 'react'
import { Row, Col } from 'antd'

import NavLink from './NavLink'
import './HeaderNav.css'

function HeaderNav() {
  const linkText = '乐高生产管理系统'

  return (
    <Row>
      <Col span={12}>
        <div className="header_title">
          <NavLink target="/" linkText={linkText} />
        </div>
      </Col>
      <Col span={12}>
        <div className="header_user">吴磊</div>
      </Col>
    </Row>
  )
}

export default HeaderNav
