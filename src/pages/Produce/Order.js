import React, { useEffect, useState, useRef } from 'react'
import { Card, Table, Modal, Button, Spin, message } from 'antd'
import { connect } from 'dva'
import moment from 'moment'

import QueryForm from '../../components/Produce/QueryForm'
import EditForm from '../../components/Produce/EditForm'
import BatchOpForm from '../../components/Produce/BatchOpForm'

const moduleName = 'order'
const moduleCnName = '订单'

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

function Order({ dispatch, list, record, loading, employeeList, flowList }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [batchModalVisible, setBatchModalVisible] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  })
  const [queryParams, setQueryParams] = useState({})
  const formRef = useRef()
  const addFormRef = useRef()

  useEffect(() => {
    dispatch({
      type: `${moduleName}/fetchList`,
      payload: {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      },
    })

    dispatch({
      type: `employee/fetchList`,
      payload: {
        pageNo: 1,
        pageSize: 9999,
      },
    })

    dispatch({
      type: `flow/fetchList`,
      payload: {
        pageNo: 1,
        pageSize: 9999,
      },
    })
  }, [dispatch, pagination])

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

  function addRecord() {
    dispatch({
      type: `${moduleName}/saveRecord`,
      payload: {},
    })
    setModalVisible(true)
  }

  function batchAddRecord() {
    setBatchModalVisible(true)
  }

  function saveRecord(values) {
    const { flowId, employeeId } = values
    const flowArr = flowId.split(',')
    const employeeArr = employeeId.split(',')

    const payload = {
      ...values,
      flowId: flowArr[0],
      employeeId: employeeArr[0],
    }

    dispatch({
      type: `${moduleName}/updateRecord`,
      payload,
    }).then(() => {
      setModalVisible(false)
    })
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

  function deleteRecord(records) {
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
        }).then(() => refresPage())
      },
      okText: '确认',
      cancelText: '取消',
    })
  }

  function refresPage() {
    dispatch({
      type: `${moduleName}/fetchList`,
    })
    dispatch({
      type: `${moduleName}/saveRecord`,
      payload: {},
    })
    formRef.current.resetFields()
  }

  function handleCancel() {
    setModalVisible(false)
  }

  function handleBatchCancel() {
    setBatchModalVisible(false)
  }

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelectedRows(selectedRows)
    },
  }

  function handleFlowChange(value) {
    const form = addFormRef.current
    const price = parseFloat(value.split(',')[2])
    const size = parseFloat(form.getFieldValue('size') || 0)

    form.setFieldsValue({ price })
    form.setFieldsValue({ cost: price * size })
  }

  function handleSizeChange(value) {
    const form = addFormRef.current
    const price = parseFloat(form.getFieldValue('price'))
    const size = parseFloat(value)

    form.setFieldsValue({ cost: price * size })
  }

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

  const addItems = [
    {
      type: 'select',
      name: 'employeeId',
      displayName: '车工姓名',
      options: {
        rules: [
          {
            required: true,
            message: '请输入车工姓名',
          },
        ],
      },
      selectOptions: employeeList.map(item => ({ value: `${item.id},${item.employeeName}`, text: item.employeeName })),
      props: {
        showSearch: true,
        filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      },
    },
    {
      type: 'select',
      name: 'flowId',
      displayName: '工序名称',
      options: {
        rules: [
          {
            required: true,
            message: '请输入工序名称',
          },
        ],
      },
      selectOptions: flowList.map(item => ({ value: `${item.id},${item.flowName},${item.price}`, text: item.flowName })),
      handleChange: handleFlowChange,
      props: {
        showSearch: true,
        filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
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
      handleChange: handleSizeChange,
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

  return (
    <Card>
      <QueryForm
        ref={formRef}
        queryItems={queryItems}
        queryRecord={queryRecord}
        addRecord={addRecord}
        batchAddRecord={batchAddRecord}
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
        <EditForm addItems={addItems} record={record} saveRecord={saveRecord} ref={addFormRef} />
      </Modal>
      <Modal
        title={`批量修改${moduleCnName}`}
        width={1000}
        style={{ top: 30 }}
        onCancel={handleBatchCancel}
        visible={batchModalVisible}
        footer={null}
      >
        <BatchOpForm addItems={addItems} saveRecord={saveRecord} />
      </Modal>
    </Card>
  )
}

export default connect(state => ({
  ...state.order,
  employeeList: state.employee.list,
  flowList: state.flow.list,
}))(Order)
