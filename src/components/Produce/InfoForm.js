import React, { useState } from 'react'
import { Form, Button } from 'antd'

import CommonForm from './CommonForm'

function InfoForm({ form, record, infoItems = [], modifyRecord }) {
  const [onlyText, setOnlyText] = useState(true)
  const [buttonText, setButtonText] = useState('编辑修改')

  function modify() {
    if (onlyText) {
      setButtonText('完成修改')
      setOnlyText(!onlyText)
    } else {
      form.validateFields((err, values) => {
        if (err) {
          return
        }

        modifyRecord(values).then(() => {
          setOnlyText(!onlyText)
          setButtonText('编辑修改')
        })
      })
    }
  }

  return (
    <CommonForm
      form={form}
      formItems={infoItems}
      record={record}
      onlyText={onlyText}
      renderTailPart={() => (
        <Button type="primary" style={{ marginRight: '16px' }} onClick={modify}>
          {buttonText}
        </Button>
      )}
    />
  )
}

export default Form.create({
  mapPropsToFields(props) {
    const { record = {} } = props
    const result = {}

    console.log(record)
    Object.keys(record).forEach(key => {
      result[key] = Form.createFormField({
        value: record[key],
      })
    })

    return result
  },
})(InfoForm)
