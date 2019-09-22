import React from 'react'
import { Form, Input, Select, Radio, Row, DatePicker } from 'antd'

import './index.css'

const { Item: FormItem } = Form
const { Option } = Select
const { RangePicker } = DatePicker

function CommonForm({ form, formItems = [], itemCommonProps, layout = 'horizontal', renderTailPart }) {
  const { getFieldDecorator } = form

  function generateItem(item) {
    const itemProps = { ...itemCommonProps, ...item.props }
    if (item.type === 'input') {
      return getFieldDecorator(item.name, item.options)(<Input placeholder={item.placeholder} {...itemProps} />)
    }

    if (item.type === 'select') {
      return getFieldDecorator(item.name, item.options)(
        <Select placeholder={item.placeholder} style={{ width: '160px' }} {...itemProps}>
          {(item.selectOptions || []).map(item => (
            <Option key={item.value} value={item.value}>
              {item.text}
            </Option>
          ))}
        </Select>
      )
    }

    if (item.type === 'radio') {
      return getFieldDecorator(item.name, item.options)(
        <Radio.Group placeholder={item.placeholder} {...itemProps}>
          {(item.radioOptions || []).map(item => (
            <Radio key={item.value} value={item.value}>
              {item.text}
            </Radio>
          ))}
        </Radio.Group>
      )
    }

    if (item.type === 'rangepicker') {
      return getFieldDecorator(item.name, item.options)(<RangePicker {...itemProps} />)
    }
  }

  const formItemLayout =
    layout === 'horizontal'
      ? {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
        }
      : null

  const tailFormItemLayout =
    layout === 'horizontal'
      ? {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 20,
              offset: 4,
            },
          },
        }
      : null

  return (
    <Form layout={layout} className={layout}>
      <Row>
        {formItems.map(item => (
          <FormItem key={item.name} label={item.displayName} {...formItemLayout}>
            {generateItem(item)}
          </FormItem>
        ))}
      </Row>
      <Row style={{ margin: '16px 0' }}>{renderTailPart ? <FormItem {...tailFormItemLayout}>{renderTailPart()}</FormItem> : null}</Row>
    </Form>
  )
}

export default CommonForm
