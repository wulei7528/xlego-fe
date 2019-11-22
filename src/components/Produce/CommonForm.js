import React from 'react'
import { Form, Row } from 'antd'

import { generateFormItem } from '../../utils/form'
import './index.css'

const { Item: FormItem } = Form

function CommonForm({ form, formItems = [], itemCommonProps, layout = 'horizontal', renderTailPart, record, onlyText = false }) {
  const { getFieldDecorator } = form

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
            {onlyText && record[item.name]}
            <span style={{ display: onlyText ? 'none' : 'block' }}>
              {getFieldDecorator(item.name, item.options)(generateFormItem(item, { itemProps: itemCommonProps }))}
            </span>
          </FormItem>
        ))}
      </Row>
      <Row style={{ margin: '16px 0' }}>{renderTailPart ? <FormItem {...tailFormItemLayout}>{renderTailPart()}</FormItem> : null}</Row>
    </Form>
  )
}

export default CommonForm
