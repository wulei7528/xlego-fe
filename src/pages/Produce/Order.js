import React, { useEffect, useState } from 'react'
import { Card, Table, Modal, Button, Spin, message } from 'antd'
import { connect } from 'dva'

import QueryForm from '../../components/Produce/QueryForm'
import BatchAddForm from '../../components/Produce/BatchAddForm'

const moduleName = 'order'
const moduleCnName = '订单'

const columns = [
  {
    title: '订单ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '车工姓名',
    dataIndex: 'employeeName',
    key: 'employeeName',
  },
  {
    title: '工序名称',
    dataIndex: 'flowName',
    key: 'flowName',
  },
  {
    title: '数量',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: '工序价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '工序费用',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: record => record,
  },
]

const queryItems = [
  {
    type: 'input',
    name: 'id',
    displayName: '订单ID',
  },
  {
    type: 'input',
    name: 'employeeName',
    displayName: '车工姓名',
  },
  {
    type: 'input',
    name: 'flowName',
    displayName: '工序名称',
  },
]

const addItems = [
  {
    type: 'input',
    name: 'employeeName',
    displayName: '车工姓名',
    options: {
      rules: [
        {
          required: true,
          message: '请输入车工姓名',
        },
      ],
    },
  },
  {
    type: 'input',
    name: 'flowName',
    displayName: '工序名称',
    options: {
      rules: [
        {
          required: true,
          message: '请输入工序名称',
        },
      ],
    },
  },
  {
    type: 'input',
    name: 'size',
    displayName: '数量',
    options: {
      rules: [
        {
          required: true,
          message: '请输入工序数量',
        },
      ],
    },
  },
  {
    type: 'input',
    name: 'price',
    displayName: '工序单价',
    props: {
      disabled: true,
    },
  },
  {
    type: 'input',
    name: 'cost',
    displayName: '工序费用',
    props: {
      disabled: true,
    },
  },
]

function Order({ dispatch, list, loading }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(() => {
    dispatch({
      type: `${moduleName}/fetchList`,
    })
  }, [dispatch])

  function queryRecord(values) {
    dispatch({
      type: `${moduleName}/fetchList`,
      payload: values,
    })
  }

  function addRecord() {
    setModalVisible(true)
  }

  function saveRecord(values) {
    dispatch({
      type: `${moduleName}/updateRecord`,
      payload: values,
    }).then(() => {
      setModalVisible(false)
    })
  }

  function deleteRecord() {
    if (!selectedRows.length) {
      message.error('请选择至少一个删除选项')
      return
    }

    Modal.confirm({
      content: `确认要删除${moduleCnName}`,
      onOk: () => {},
      okText: '确认',
      cancelText: '取消',
    })
  }

  function handleCancel() {
    setModalVisible(false)
  }

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelectedRows(selectedRows)
    },
  }

  return (
    <Card title={`${moduleCnName}信息`}>
      <QueryForm queryItems={queryItems} addRecord={addRecord} queryRecord={queryRecord} />
      {selectedRows.length > 0 && (
        <Card style={{ margin: '10px 0' }}>
          <Button onClick={deleteRecord}>删除</Button>
        </Card>
      )}
      <Spin tip="努力加载中..." spinning={loading.list}>
        <Table dataSource={list} columns={columns} rowSelection={rowSelection} bordered />
      </Spin>
      <Modal title={`新增${moduleCnName}`} width={800} onCancel={handleCancel} visible={modalVisible} footer={null}>
        <BatchAddForm addItems={addItems} saveRecord={saveRecord} />
      </Modal>
    </Card>
  )
}

export default connect(state => ({
  ...state.order,
}))(Order)
