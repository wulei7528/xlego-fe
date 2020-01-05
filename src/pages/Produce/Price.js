import React, { useEffect, useState } from 'react'
import { Card, Table, Spin } from 'antd'
import { connect } from 'dva'
import moment from 'moment'

import QueryForm from '../../components/Produce/QueryForm'

const moduleName = 'price'

const queryItems = [
  {
    type: 'input',
    name: 'flowId',
    displayName: '工序ID',
  },
  {
    type: 'input',
    name: 'flowName',
    displayName: '工序名称',
  },
]

function Price({ dispatch, list, loading }) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  })
  const [queryParams, setQueryParams] = useState({})

  useEffect(() => {
    dispatch({
      type: `${moduleName}/fetchList`,
      payload: {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
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

  const columns = [
    {
      title: '工序ID',
      dataIndex: 'flowId',
      key: 'flowId',
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
  ]

  return (
    <Card>
      <QueryForm queryItems={queryItems} queryRecord={queryRecord} />
      <Spin tip="努力加载中..." spinning={loading.list}>
        <Table size="small" dataSource={list} columns={columns} bordered rowKey="id" onChange={tableChange} pagination={pagination} />
      </Spin>
    </Card>
  )
}

export default connect(state => ({
  ...state.price,
}))(Price)
