import React from 'react'
import { Form, Button } from 'antd'

import CommonForm from './CommonForm'

function QueryForm({ form, queryItems = [], queryRecord, addRecord }) {
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

  return (
    <CommonForm
      layout="inline"
      form={form}
      formItems={queryItems}
      renderTailPart={() => (
        <div>
          <Button type="primary" style={{ marginRight: '16px' }} onClick={query}>
            查询
          </Button>
          <Button style={{ marginRight: '16px' }} onClick={reset}>
            重置
          </Button>
          {addRecord && (
            <Button type="primary" onClick={addRecord}>
              新增
            </Button>
          )}
        </div>
      )}
    />
  )
}

export default Form.create()(QueryForm)
