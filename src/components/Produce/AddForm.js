import React from 'react'
import { Form, Input, Select, Button } from 'antd'

const { Item: FormItem } = Form
const { Option } = Select

function AddForm({ form, addItems = [], saveRecord }) {
  const { getFieldDecorator } = form

  function genItem(item) {
    if (item.type === 'input') {
      return getFieldDecorator(item.name, item.options)(<Input placeholder={item.placeholder} style={{ width: '200px' }} />)
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

  function save() {
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      saveRecord(values)
    })
  }

  function reset() {
    form.resetFields()
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  }

  const tailFormItemLayout = {
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

  return (
    <Form {...formItemLayout}>
      {addItems.map(item => (
        <FormItem label={item.displayName}>{genItem(item)}</FormItem>
      ))}
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" style={{ marginRight: '16px' }} onClick={save}>
          保存
        </Button>
        <Button onClick={reset}>重置</Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(AddForm)
