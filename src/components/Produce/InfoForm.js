import React, { useState } from 'react'
import { Form, Button } from 'antd'

import CommonForm from './CommonForm'

function InfoForm({ form, record, infoItems = [], modifyRecord }) {
  const [onlyText, setOnlyText] = useState(true)
  const [buttonText, setButtonText] = useState('编辑修改')

  function modify() {
    setOnlyText(!onlyText)

    if (onlyText) {
      setButtonText('完成修改')
    } else {
      form.validateFields((err, values) => {
        if (err) {
          return
        }

        modifyRecord(values)
      })
      setButtonText('启动修改')
    }
  }

  return (
    <CommonForm
      form={form}
      formItems={infoItems}
      record={record}
      onlyText={onlyText}
      renderTailPart={() => (
        <div>
          <Button type="primary" style={{ marginRight: '16px' }} onClick={modify}>
            {buttonText}
          </Button>
        </div>
      )}
    />
  )
}

export default Form.create({
  mapPropsToFields(props) {
    const { record } = props
    const result = {}

    Object.keys(record).forEach(key => {
      result[key] = Form.createFormField({
        value: record[key],
      })
    })

    return result
  },
})(InfoForm)
