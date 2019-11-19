import React from 'react'
import CommonForm from './CommonForm'
import { Form, Button } from 'antd'

function EditForm({ form, addItems = [], record = {}, saveRecord }) {
  function save() {
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      saveRecord({ ...record, ...values })
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

export default Form.create({
  mapPropsToFields(props) {
    const { record = {} } = props
    const result = {}

    Object.keys(record).forEach(key => {
      result[key] = Form.createFormField({
        value: record[key],
      })
    })

    return result
  },
})(EditForm)
