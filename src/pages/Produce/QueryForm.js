import React from 'react'
import { Form, Input, Select, Row, Col, Card } from 'antd'

const { Item: FormItem } = Form
const { Option } = Select

function QueryForm({ form, queryItems = [] }) {
  const { getFieldDecorator } = form

  function genItem(item) {
    if (item.type === 'input') {
      return getFieldDecorator(item.name, item.options)(<Input placeholder={item.placeholder} />)
    }

    if ((item.type = 'select')) {
      return getFieldDecorator(item.name, item.options)(
        <Select placeholder={item.placeholder} style={{ width: '160px' }}>
          {(item.selectOptions || []).map(item => (
            <Option value={item.value}>{item.text}</Option>
          ))}
        </Select>
      )
    }
  }

  return (
    <Form layout="inline">
      <Card title="条件查询" style={{ margin: '10px 0' }}>
        <Row>
          {queryItems.map(item => (
            <Col span={6} key={item.name}>
              <FormItem label={item.displayName}>{genItem(item)}</FormItem>
            </Col>
          ))}
        </Row>
      </Card>
    </Form>
  )
}

export default Form.create()(QueryForm)
