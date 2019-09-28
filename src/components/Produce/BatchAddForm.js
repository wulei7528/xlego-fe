import React, { useEffect, useState } from 'react'
import { Form, Button, Table } from 'antd'

function AddForm({ form, addItems = [], dataSource, saveRecord }) {
  const [batchData, setBatchData] = useState([])

  console.log(dataSource)
  useEffect(() => {
    setBatchData(dataSource || [])
  }, [dataSource])

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

  function handleAdd() {
    const newData = {}
    setBatchData([...batchData, newData])
  }

  const columns = addItems.map(item => ({
    title: item.displayName,
  }))

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        新增记录
      </Button>
      <Table dataSource={batchData} columns={columns} />
    </div>
  )
}

export default Form.create()(AddForm)
