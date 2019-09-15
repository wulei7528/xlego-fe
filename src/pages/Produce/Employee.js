import React, { useEffect, useState, useRef } from 'react'
import { Card, Table, Modal, Button, Spin, message } from 'antd'
import { connect } from 'dva'

import QueryForm from './QueryForm'

const moduleName = 'employee'
const moduleCnName = '员工'

const columns = [
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
]

const queryItems = [
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

function Employee({ dispatch, list, loading }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const formRef = useRef()

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

  function query() {
    const form = formRef.current.getForm()

    form.validateFields((err, values) => {
      if (err) {
        return
      }

      queryRecord(values)
    })
  }

  function reset() {
    const form = formRef.current.getForm()

    form.resetFields()
  }

  function addRecord() {
    setModalVisible(true)
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

  function handleOk() {
    setModalVisible(false)
  }

  function handleCancel() {
    setModalVisible(false)
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`)
      setSelectedRows(selectedRows)
    },
  }

  return (
    <div>
      <QueryForm queryItems={queryItems} ref={formRef} />
      <Card style={{ margin: '10px 0' }}>
        <Button type="primary" style={{ marginRight: '16px' }} onClick={query}>
          查询
        </Button>
        <Button style={{ marginRight: '16px' }} onClick={reset}>
          重置
        </Button>
        <Button type="primary" style={{ marginRight: '16px' }} onClick={addRecord}>
          新增
        </Button>
        <Button onClick={deleteRecord}>删除</Button>
      </Card>
      <Spin tip="努力加载中..." spinning={loading.list}>
        <Table dataSource={list} columns={columns} rowSelection={rowSelection} />
      </Spin>
      <Modal
        title={`新增${moduleCnName}`}
        width={800}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      ></Modal>
    </div>
  )
}

export default connect(state => ({
  ...state.employee,
}))(Employee)
