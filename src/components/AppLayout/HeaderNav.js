import React, { useState } from 'react'
import { Row, Col, Icon, Menu, Button, Dropdown } from 'antd'
import { connect } from 'dva'
import cookies from 'js-cookie'

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

  function logout(e) {
    e.preventDefault()

    cookies.remove('userName')
    cookies.remove('companyId')
    window.location.href = `/`
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button type="link" icon="logout" onClick={logout}>
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Row>
      <Col span={12}>
        <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
      </Col>
      <Col span={12}>
        <div className="header_user">
          <Dropdown overlay={menu}>
            <Button>{cookies.get('userName') || '未知用户'}</Button>
          </Dropdown>
        </div>
      </Col>
    </Row>
  )
}

export default connect()(HeaderNav)
