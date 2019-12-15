import React, { useEffect, useState, useRef } from 'react'
import { Card, Table, Modal, Button, Spin, message } from 'antd'
import { connect } from 'dva'
import moment from 'moment'

import QueryForm from '../../components/Produce/QueryForm'
import EditForm from '../../components/Produce/EditForm'

const moduleName = 'employee'
const moduleCnName = '员工'

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
    type: 'input',
    name: 'telephone',
    displayName: '联系电话',
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

function Employee({ dispatch, list, record, loading }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  })
  const [queryParams, setQueryParams] = useState({})
  const formRef = useRef()

  useEffect(() => {
    dispatch({
      type: `${moduleName}/fetchList`,
      payload: {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      },
    })
  }, [dispatch, pagination])

  // 查询
  function queryRecord(values) {
    const payload = { ...values, pageNo: 1, pageSize: pagination.pageSize }
    setQueryParams(payload)

    dispatch({
      type: `${moduleName}/fetchList`,
      payload,
    })
  }

  function tableChange(pageInfo) {
    const curPageInfo = { ...pagination, ...pageInfo }
    setPagination(curPageInfo)

    const payload = {
      ...queryParams,
      pageNo: curPageInfo.current,
      pageSize: curPageInfo.pageSize,
    }
    setQueryParams(payload)

    dispatch({
      type: `${moduleName}/fetchList`,
      payload,
    })
  }

  // 新增&修改
  function addRecord() {
    setModalVisible(true)
  }

  function editRecord(record) {
    dispatch({
      type: `${moduleName}/getRecord`,
      payload: {
        id: record.id,
      },
    }).then(() => {
      setModalVisible(true)
    })
  }

  function saveRecord(values) {
    dispatch({
      type: `${moduleName}/updateRecord`,
      payload: values,
    }).then(() => {
      setModalVisible(false)
      refreshPage()
    })
  }

  // 删除
  function deleteRecord(records = []) {
    if (!records.length) {
      message.error('请选择至少一个删除选项')
      return
    }

    Modal.confirm({
      content: `确认要删除${moduleCnName}`,
      onOk: () => {
        dispatch({
          type: `${moduleName}/deleteRecord`,
          payload: {
            id: records[0].id,
          },
        }).then(() => refreshPage())
      },
      okText: '确认',
      cancelText: '取消',
    })
  }

  function handleCancel() {
    dispatch({
      type: `${moduleName}/saveRecord`,
      payload: {},
    })
    setModalVisible(false)
  }

  function refreshPage() {
    dispatch({
      type: `${moduleName}/fetchList`,
    })
    dispatch({
      type: `${moduleName}/saveRecord`,
      payload: {},
    })
    formRef.current.resetFields()
  }

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelectedRows(selectedRows)
    },
  }

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
      dataIndex: 'employeeRole',
      key: 'employeeRole',
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
      render: text => {
        return moment(text).format('YYYY-MM-DD HH:mm:SS')
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: text => {
        return moment(text).format('YYYY-MM-DD HH:mm:SS')
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => {
        return (
          <>
            <Button type="primary" onClick={() => editRecord(record)} style={{ marginRight: 10 }}>
              修改
            </Button>
            <Button type="primary" onClick={() => deleteRecord([record])}>
              删除
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <Card>
      <QueryForm
        ref={formRef}
        queryItems={queryItems}
        addRecord={addRecord}
        queryRecord={queryRecord}
        deleteRecord={() => deleteRecord(selectedRows)}
      />
      <Spin tip="努力加载中..." spinning={loading.list}>
        <Table
          size="middle"
          dataSource={list}
          columns={columns}
          rowSelection={rowSelection}
          bordered
          rowKey="id"
          onChange={tableChange}
          pagination={pagination}
        />
      </Spin>
      <Modal title={`编辑${moduleCnName}`} width={800} onCancel={handleCancel} visible={modalVisible} footer={null}>
        <EditForm addItems={addItems} record={record} saveRecord={saveRecord} />
      </Modal>
    </Card>
  )
}

export default connect(state => ({
  ...state.employee,
}))(Employee)
