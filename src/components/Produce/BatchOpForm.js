import React, { useEffect, useState } from 'react'
import { Form, Card, Table, Button } from 'antd'
import { connect } from 'dva'

import { generateFormItem } from '../../utils/form'

const { Item: FormItem } = Form

function BatchOpForm({ form, dispatch, addItems = [], employeeList = [], saveRecord }) {
  const [batchData, setBatchData] = useState([])
  const [curEmployee, setCurEmployee] = useState('请选择员工后查看')
  const [rowIndex, setRowIndex] = useState(null)
  const { getFieldDecorator } = form

  useEffect(() => {
    dispatch({
      type: 'employee/fetchList',
      payload: {
        pageNo: 1,
        pageSize: 9999,
      },
    })

    setRowIndex(null)
  }, [dispatch])

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

  const employeeColumns = [
    {
      title: '选择员工',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
  ]

  // 选中行
  function onRow(record) {
    return {
      onClick: () => {
        setRowIndex(record.id)
        setCurEmployee(record.employeeName)

        dispatch({
          type: 'order/fetchList',
          payload: {
            employeeId: record.id,
            pageNo: 1,
            pageSize: 9999,
          },
        })
      },
    }
  }

  function setRowClassName(record) {
    return record.id === rowIndex ? 'row-selected' : ''
  }

  return (
    <div>
      <div style={{ height: 350 }}>
        <Table
          className="batch-part"
          size="middle"
          bordered
          dataSource={employeeList}
          columns={employeeColumns}
          pagination={false}
          onRow={onRow}
          rowClassName={setRowClassName}
          rowKey="id"
        />
        <Card
          size="small"
          title={
            <>
              订单列表[<span style={{ color: 'red' }}>当前员工:{curEmployee}</span>]
            </>
          }
          className="batch-part"
          style={{ width: 840 }}
        >
          <Table size="middle" bordered dataSource={batchData} columns={columns} pagination={false} rowKey="id" />
        </Card>
      </div>
    </div>
  )
}

export default connect(state => ({
  employeeList: state.employee.list,
}))(Form.create()(BatchOpForm))
