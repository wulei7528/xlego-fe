import React from 'react'
import { Form, Button } from 'antd'

import CommonForm from './CommonForm'

function QueryForm({ form, queryItems = [], queryRecord, addRecord, buttonText = {} }) {
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

  const { queryButtonText = '查询', resetButtonText = '重置', addButtonText = '新增' } = buttonText

  return (
    <CommonForm
      layout="inline"
      form={form}
      formItems={queryItems}
      renderTailPart={() => (
        <div>
          <Button type="primary" style={{ marginRight: '16px' }} onClick={query}>
            {queryButtonText}
          </Button>
          <Button style={{ marginRight: '16px' }} onClick={reset}>
            {resetButtonText}
          </Button>
          {addRecord && (
            <Button type="primary" onClick={addRecord}>
              {addButtonText}
            </Button>
          )}
        </div>
      )}
    />
  )
}

export default Form.create()(QueryForm)
