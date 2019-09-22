import React from 'react'
import { Card, Table, Spin } from 'antd'
import { connect } from 'dva'

import QueryForm from '../../components/Produce/QueryForm'

const moduleName = 'report'
const moduleCnName = '报表'

const columns = [
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
    type: 'rangepicker',
    name: 'time',
    displayName: '起始时间',
  },
]

function Price({ dispatch, list, loading }) {
  function queryRecord(values) {
    dispatch({
      type: `${moduleName}/fetchList`,
      payload: values,
    })
  }

  return (
    <Card title={`${moduleCnName}信息`}>
      <QueryForm queryItems={queryItems} queryRecord={queryRecord} buttonText={{ queryButtonText: '生成报表' }} />
      {list.length > 0 ? (
        <Spin tip="努力加载中..." spinning={loading.list}>
          <Table dataSource={list} columns={columns} bordered />
        </Spin>
      ) : null}
    </Card>
  )
}

export default connect(state => ({
  ...state.price,
}))(Price)
