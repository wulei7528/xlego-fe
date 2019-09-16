import React, { useState } from 'react'
import { Row, Col, Icon } from 'antd'
import { connect } from 'dva'

import './HeaderNav.css'

function HeaderNav({ dispatch }) {
  const [collapsed, setCollapsed] = useState(false)

  function toggle() {
    setCollapsed(!collapsed)
    dispatch({
      type: 'common/saveSiderMenuCollapsed',
      payload: !collapsed,
    })
  }

  return (
    <Row>
      <Col span={12}>
        <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
      </Col>
      <Col span={12}>
        <div className="header_user">吴磊</div>
      </Col>
    </Row>
  )
}

export default connect()(HeaderNav)
