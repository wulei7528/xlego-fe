import React, { useState } from 'react'
import { Modal } from 'antd'
import { connect } from 'dva'

import Employee from './Employee'
import EditableTable from '../../components/Produce/EditableTable'

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

  function submitData(data) {
    dispatch({
      type: `${moduleName}/orderbatch`,
      payload: data,
    })
  }

  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '工序名称',
      dataIndex: 'flowId',
      key: 'flowId',
      editable: true,
      inputType: 'select',
      items: flowList.map(item => ({ value: item.id, text: item.flowName })),
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
          <EditableTable size="middle" bordered list={curList} columns={columns} pagination={false} rowKey="id" submitData={submitData} />
        </div>
      </Modal>
    </>
  )
}

export default connect(state => ({
  employeeList: state.employee.list,
  flowList: state.flow.list,
}))(BatchOrder)
