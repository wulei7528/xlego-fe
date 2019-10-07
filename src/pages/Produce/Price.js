import React, { useEffect } from 'react'
import { Card, Table, Spin } from 'antd'
import { connect } from 'dva'

import QueryForm from '../../components/Produce/QueryForm'

const moduleName = 'price'
const moduleCnName = '价格'

const columns = [
  {
    title: '工序ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '工序名称',
    dataIndex: 'flowName',
    key: 'flowName',
  },
  {
    title: '工序历史价格',
    dataIndex: 'price',
    key: 'price',
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
    displayName: '工序ID',
  },
  {
    type: 'input',
    name: 'flowName',
    displayName: '工序名称',
  },
]

function Price({ dispatch, list, loading }) {
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

  return (
    <Card>
      <QueryForm queryItems={queryItems} queryRecord={queryRecord} />
      <Spin tip="努力加载中..." spinning={loading.list}>
        <Table size="middle" dataSource={list} columns={columns} bordered />
      </Spin>
    </Card>
  )
}

export default connect(state => ({
  ...state.price,
}))(Price)
