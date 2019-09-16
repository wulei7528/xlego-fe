import React from 'react'
import { Form, Input, Select, Row, Col, Button } from 'antd'

const { Item: FormItem } = Form
const { Option } = Select

function QueryForm({ form, queryItems = [], queryRecord, addRecord }) {
  const { getFieldDecorator } = form

  function genItem(item) {
    if (item.type === 'input') {
      return getFieldDecorator(item.name, item.options)(<Input placeholder={item.placeholder} />)
    }

    if ((item.type = 'select')) {
      return getFieldDecorator(item.name, item.options)(
        <Select placeholder={item.placeholder} style={{ width: '160px' }}>
          {(item.selectOptions || []).map(item => (
            <Option key={item.value} value={item.value}>
              {item.text}
            </Option>
          ))}
        </Select>
      )
    }
  }

  function query() {
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      queryRecord(values)
    })
  }

  function reset() {
    form.resetFields()
  }

  const colProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 6,
    style: {
      marginBottom: 16,
    },
  }

  return (
    <Form layout="inline">
      <Row>
        {queryItems.map(item => (
          <Col key={item.name} {...colProps}>
            <FormItem label={item.displayName}>{genItem(item)}</FormItem>
          </Col>
        ))}
        <Col>
          <Button type="primary" style={{ marginRight: '16px' }} onClick={query}>
            查询
          </Button>
          <Button style={{ marginRight: '16px' }} onClick={reset}>
            重置
          </Button>
          {addRecord && (
            <Button type="primary" style={{ float: 'right' }} onClick={addRecord}>
              新增
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(QueryForm)
