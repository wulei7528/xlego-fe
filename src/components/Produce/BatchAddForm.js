import React, { useEffect, useState } from 'react'
import { Form, Button, Table, Row } from 'antd'

import { generateFormItem } from '../../utils/form'

const { Item: FormItem } = Form

function BatchAddForm({ form, addItems = [], dataSource, saveRecord }) {
  const [batchData, setBatchData] = useState([])
  const { getFieldDecorator } = form

  useEffect(() => {
    setBatchData(dataSource || [])
  }, [dataSource])

  function save() {
    form.validateFields(err => {
      if (err) {
        return
      }

      saveRecord(batchData)
    })
  }

  function reset() {
    form.resetFields()
  }

  function handleItemChange(key, index, value) {
    const data = [...batchData]
    data[index][key] = value

    setBatchData(data)
  }

  function generateItem(item, text, index) {
    const itemOptions = {
      ...item.options,
      initialValue: text,
    }
    const options = {
      handleChange: value => {
        handleItemChange(item.name, index, value)
      },
    }

    return (
      <Form>
        <FormItem>{getFieldDecorator(`${item.name}${index}`, itemOptions)(generateFormItem(item, options))}</FormItem>
      </Form>
    )
  }

  function handleAdd() {
    const newData = {}
    setBatchData([...batchData, newData])
  }

  const columns = addItems.map(item => ({
    title: item.displayName,
    dataIndex: item.name,
    key: item.name,
    render: (text, record, index) => generateItem(item, text, index),
  }))

  return (
    <div>
      <Row style={{ marginBottom: 10 }}>
        <Button onClick={handleAdd} type="primary" style={{ marginRight: 16 }}>
          添加一行
        </Button>
        <Button type="primary" style={{ marginRight: '16px' }} onClick={save}>
          保存
        </Button>
        <Button onClick={reset}>重置</Button>
      </Row>
      <Table size="middle" bordered dataSource={batchData} columns={columns} pagination={false} />
    </div>
  )
}

export default Form.create()(BatchAddForm)
