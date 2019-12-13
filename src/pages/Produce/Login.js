import React, { useEffect } from 'react'
import cookies from 'js-cookie'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { connect } from 'dva'

const moduleName = 'user'
function Login({ form, dispatch }) {
  const { getFieldDecorator } = form

  useEffect(() => {
    // 判断用户是否登录
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        // 请求后台用户信息是否存在
        dispatch({
          type: `${moduleName}/fetchList`,
          payload: values,
        }).then(data => {
          const result = data.data || []

          if (result.length === 0) {
            message.success('用户名或密码错误,请重新登录')
            return
          }

          const { companyId, userName } = result[0] || {}

          cookies.set('userName', userName, { expires: 1 })
          cookies.set('companyId', companyId, { expires: 1 })

          window.location = '/'
        })
      }
    })
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, background: '#eee', width: '100%', height: '100%' }}>
      <Form
        style={{
          position: 'absolute',
          background: '#fff',
          width: 360,
          padding: 20,
          top: '30%',
          left: '50%',
          marginLeft: -180,
        }}
      >
        <h2 style={{ textAlign: 'center' }}>工厂生产管理系统1.0</h2>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)}
        </Form.Item>
        <Form.Item>
          <Checkbox>记住我</Checkbox>
          <Button type="primary" className="login-form-button" onClick={handleSubmit}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect()(Form.create()(Login))
