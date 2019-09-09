import React from 'react'
import { Row, Col } from 'antd'

import './HeaderNav.css'

function HeaderNav() {
  return (
    <Row>
      <Col span={12}>
        <div className="header_title">乐高生产管理系统</div>
      </Col>
      <Col span={12}>
        <div className="header_user">吴磊</div>
      </Col>
    </Row>
  )
}

export default HeaderNav
