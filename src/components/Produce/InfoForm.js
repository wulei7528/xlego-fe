import React, { useState } from 'react'
import { Form, Button } from 'antd'

import CommonForm from './CommonForm'

function InfoForm({ form, infoItems = [], modifyRecord }) {
  const [formDisabled, setFormDisabled] = useState(true)
  const [buttonText, setButtonText] = useState('编辑修改')

  function modify() {
    setFormDisabled(!formDisabled)

    if (formDisabled) {
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

  function reset() {
    form.resetFields()
  }

  return (
    <CommonForm
      form={form}
      formItems={infoItems}
      disabled={formDisabled}
      renderTailPart={() => (
        <div>
          <Button type="primary" style={{ marginRight: '16px' }} onClick={modify}>
            {buttonText}
          </Button>
          <Button style={{ marginRight: '16px' }} onClick={reset}>
            重置
          </Button>
        </div>
      )}
    />
  )
}

export default Form.create()(InfoForm)
