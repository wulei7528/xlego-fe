import React, { useState } from 'react'
import { Modal } from 'antd'
import { connect } from 'dva'
import cookies from 'js-cookie'

import Employee from './Employee'
import EditableTable from '../../components/Produce/EditableTable'

import './index.css'

const moduleName = 'order'

function BatchOrder({ dispatch, flowList }) {
  const [batchModalVisible, setBatchModalVisible] = useState(false)
  const [curEmployee, setCurEmployee] = useState({})
  const [curList, setCurList] = useState([])

  function handleBatchCancel() {
    setBatchModalVisible(false)
  }

  function batchOrder(employee) {
    setBatchModalVisible(true)
    setCurEmployee(employee)

    dispatch({
      type: `${moduleName}/fetchList`,
      payload: {
        employeeId: employee.id,
      },
    }).then(data => {
      setCurList(data.data || [])
    })
  }

  function submitData(data, deletedData) {
    const companyId = cookies.get('companyId')

    data.forEach(item => {
      if (item.id.toString().indexOf('new') === 0) {
        item.id = null
        item.companyId = companyId
        item.employeeId = curEmployee.id
      }
    })

    const payload = [...data, ...deletedData]

    console.log(payload)

    return dispatch({
      type: `${moduleName}/orderbatch`,
      payload,
    })
  }

  function setClassName(record) {
    return record.id && record.id.toString().indexOf('new') === 0 ? 'row-add' : ''
  }

  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => {
        return record.id && record.id.toString().indexOf('new') === 0 ? '新订单' : record.id
      },
    },
    {
      title: '工序名称',
      dataIndex: 'flowId',
      key: 'flowId',
      editable: true,
      inputType: 'select',
      getDisplayText: record => (flowList.find(item => item.id === record.flowId) || {}).flowName,
      items: flowList.map(item => ({ value: item.id, text: item.flowName })),
      inputChange: ({ form, record, value, update }) => {
        const price = (flowList.find(item => item.id === value) || {}).price
        const size = record.size || 0
        const cost = size * price
        form.setFieldsValue({ [`${record.id}-price`]: price })
        form.setFieldsValue({ [`${record.id}-cost`]: cost })

        update(record.id, {
          flowId: value,
          price,
          cost,
        })
      },
    },
    {
      title: '工序价格',
      dataIndex: 'price',
      key: 'price',
      editable: true,
      disabled: true,
    },
    {
      title: '数量',
      dataIndex: 'size',
      key: 'size',
      editable: true,
      inputChange: ({ form, record, value, update }) => {
        const size = value >= 0 ? value : 0
        const price = Number(record.price) || 0
        const cost = size * price
        form.setFieldsValue({ [`${record.id}-cost`]: cost })

        update(record.id, {
          size,
          cost,
        })
      },
    },
    {
      title: '工序费用',
      dataIndex: 'cost',
      key: 'cost',
      editable: true,
      disabled: true,
    },
  ]

  return (
    <>
      <Employee pageRole="order" batchOrder={batchOrder} />
      <Modal
        title={
          <div>
            管理<span style={{ color: 'red' }}>{curEmployee.employeeName}</span>的订单
          </div>
        }
        width={1200}
        style={{ top: 30 }}
        onCancel={handleBatchCancel}
        visible={batchModalVisible}
        footer={null}
      >
        <div style={{ height: 400, overflowY: 'auto' }}>
          <EditableTable list={curList} columns={columns} rowKey="id" setClassName={setClassName} submitData={submitData} />
        </div>
      </Modal>
    </>
  )
}

export default connect(state => ({
  employeeList: state.employee.list,
  flowList: state.flow.list,
}))(BatchOrder)
