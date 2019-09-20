import React from 'react'
import CommonForm from './CommonForm'
import { Form, Button } from 'antd'

function AddForm({ form, addItems = [], saveRecord }) {
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

  return (
    <CommonForm
      form={form}
      formItems={addItems}
      renderTailPart={() => (
        <>
          <Button type="primary" style={{ marginRight: '16px' }} onClick={save}>
            保存
          </Button>
          <Button onClick={reset}>重置</Button>
        </>
      )}
    />
  )
}

export default Form.create()(AddForm)
