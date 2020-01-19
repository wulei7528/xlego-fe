import React, { useState } from 'react'
import { Row, Col, Icon, Menu, Button, Dropdown, Modal, message } from 'antd'
import { connect } from 'dva'
import cookies from 'js-cookie'

import EditForm from '../Produce/EditForm'
import './HeaderNav.css'

const addItems = [
  {
    type: 'password',
    name: 'password',
    displayName: '当前密码',
    options: {
      rules: [
        {
          required: true,
          message: '请输入当前密码',
        },
      ],
    },
  },
  {
    type: 'password',
    name: 'tempPassword',
    displayName: '新密码',
    options: {
      rules: [
        {
          required: true,
          message: '请输入新密码',
        },
      ],
    },
  },
  {
    type: 'password',
    name: 'newPassword',
    displayName: '确认密码',
    options: {
      rules: [
        {
          required: true,
          message: '请再次输入新密码',
        },
      ],
    },
  },
]

function HeaderNav({ dispatch }) {
  const [collapsed, setCollapsed] = useState(false)
  const [pwdModalVisible, setPwdModalVisible] = useState(false)

  function toggle() {
    setCollapsed(!collapsed)
    dispatch({
      type: 'common/saveSiderMenuCollapsed',
      payload: !collapsed,
    })
  }

  function updatePassword() {
    setPwdModalVisible(true)
  }

  function saveRecord(values) {
    const userName = cookies.get('userName')
    const payload = { ...values, userName }

    if (payload.tempPassword !== payload.newPassword) {
      message.error('确认密码和新密码必须一致')
      return
    }

    delete payload.tempPassword

    dispatch({
      type: 'user/savePassword',
      payload,
    }).then(data => {
      if (!data || data.code) {
        message.error('密码修改失败，请重试')
        return
      }

      message.success('密码修改成功')
      setPwdModalVisible(false)
    })
  }

  function handleCancel() {
    setPwdModalVisible(false)
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
        <Button type="link" icon="logout" onClick={updatePassword}>
          修改密码
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="link" icon="logout" onClick={logout}>
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Row>
        <Col span={12}>
          <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
        </Col>
        <Col span={12}>
          <div className="header_user">
            <Dropdown overlay={menu}>
              <Button type="link">{cookies.get('userName') || '未知用户'}</Button>
            </Dropdown>
          </div>
        </Col>
      </Row>
      <Modal title="修改密码" visible={pwdModalVisible} onCancel={handleCancel} footer={null}>
        <EditForm addItems={addItems} saveRecord={saveRecord} />
      </Modal>
    </>
  )
}

export default connect()(HeaderNav)
