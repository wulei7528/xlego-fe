import React from 'react'
import { Form, Button } from 'antd'

import CommonForm from './CommonForm'

function QueryForm({ form, queryItems = [], queryRecord, addRecord, batchAddRecord, deleteRecord }) {
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

  const formButtons = [
    {
      text: '查询',
      handerClick: query,
      type: 'primary',
    },
    {
      text: '重置',
      handerClick: reset,
    },
  ]

  return (
    <CommonForm
      layout="inline"
      form={form}
      formItems={queryItems}
      renderTailPart={() => (
        <div>
          {formButtons.map(button => (
            <Button key={button.text} type={button.type} style={{ marginRight: 16 }} onClick={button.handerClick}>
              {button.text}
            </Button>
          ))}
          {addRecord && (
            <Button type="primary" style={{ marginRight: 16 }} onClick={addRecord}>
              新增
            </Button>
          )}
          {batchAddRecord && (
            <Button type="primary" style={{ marginRight: 16 }} onClick={batchAddRecord}>
              批量新增
            </Button>
          )}
          {deleteRecord && (
            <Button type="danger" style={{ marginRight: 16 }} onClick={deleteRecord}>
              删除
            </Button>
          )}
        </div>
      )}
    />
  )
}

export default Form.create()(QueryForm)
