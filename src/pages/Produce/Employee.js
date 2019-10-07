import React, { useEffect, useState } from 'react'
import { Card, Table, Modal, Button, Spin, message } from 'antd'
import { connect } from 'dva'

import QueryForm from '../../components/Produce/QueryForm'
import AddForm from '../../components/Produce/AddForm'

const moduleName = 'employee'
const moduleCnName = '员工'

const columns = [
  {
    title: '车工ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '车工姓名',
    dataIndex: 'employeeName',
    key: 'employeeName',
  },
  {
    title: '车工角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '联系电话',
    dataIndex: 'telephone',
    key: 'telephone',
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
    render: record => {
      console.log(record)
    },
  },
]

const queryItems = [
  {
    type: 'input',
    name: 'id',
    displayName: '车工ID',
  },
  {
    type: 'input',
    name: 'employeeName',
    displayName: '车工姓名',
  },
  {
    type: 'select',
    name: 'employeeRole',
    displayName: '车工角色',
    selectOptions: [
      {
        text: '普通车工',
        value: '普通车工',
      },
      {
        text: '熟手',
        value: '熟手',
      },
    ],
    options: {
      initialValue: '普通车工',
    },
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
    type: 'select',
    name: 'employeeRole',
    displayName: '车工角色',
    selectOptions: [
      {
        text: '普通车工',
        value: '普通车工',
      },
      {
        text: '熟手',
        value: '熟手',
      },
    ],
    options: {
      initialValue: '普通车工',
    },
  },
  {
    type: 'input',
    name: 'telephone',
    displayName: '联系电话',
    options: {
      rules: [
        {
          required: true,
          message: '请输入车工联系电话',
        },
      ],
    },
  },
]

function Employee({ dispatch, list, loading }) {
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
    <Card>
      <QueryForm queryItems={queryItems} addRecord={addRecord} queryRecord={queryRecord} />
      {selectedRows.length > 0 && (
        <Card style={{ margin: '10px 0' }}>
          <Button onClick={deleteRecord}>删除</Button>
        </Card>
      )}
      <Spin tip="努力加载中..." spinning={loading.list}>
        <Table size="middle" dataSource={list} columns={columns} rowSelection={rowSelection} bordered />
      </Spin>
      <Modal title={`新增${moduleCnName}`} width={800} onCancel={handleCancel} visible={modalVisible} footer={null}>
        <AddForm addItems={addItems} saveRecord={saveRecord} />
      </Modal>
    </Card>
  )
}

export default connect(state => ({
  ...state.employee,
}))(Employee)
