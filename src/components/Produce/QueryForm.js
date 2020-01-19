import React from 'react'
import { Form, Button } from 'antd'

import CommonForm from './CommonForm'
import './index.css'

function QueryForm({ form, queryItems = [], queryRecord, addRecord, batchRecord, deleteRecord, exportExcel }) {
  function query() {
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      queryRecord(values)
    })
  }

  function handleExport() {
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      exportExcel(values)
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

  const itemCommonProps = {
    handleBlur: e => {
      form.setFieldsValue({ [e.target.id]: e.target.value.trim() })
    },
  }

  return (
    <CommonForm
      layout="inline"
      form={form}
      formItems={queryItems}
      itemCommonProps={itemCommonProps}
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
          {batchRecord && (
            <Button className="btn-orange" style={{ marginRight: 16 }} onClick={batchRecord}>
              批量管理
            </Button>
          )}
          {deleteRecord && (
            <Button className="btn-orange" style={{ marginRight: 16 }} onClick={deleteRecord}>
              批量删除
            </Button>
          )}
          {exportExcel && (
            <Button className="btn-orange" style={{ marginRight: 16 }} onClick={handleExport}>
              导出Excel
            </Button>
          )}
        </div>
      )}
    />
  )
}

export default Form.create()(QueryForm)
