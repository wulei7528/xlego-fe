import React, { useEffect, useState } from 'react'
import { Card, Table, Modal, Button, Spin, message } from 'antd'
import { connect } from 'dva'

import QueryForm from '../../components/Produce/QueryForm'
import AddForm from '../../components/Produce/AddForm'

const moduleName = 'price'
const moduleCnName = '价格'

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
    type: 'input',
    name: 'flowName',
    displayName: '工序名称',
  },
]

const addItems = [
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
        <Table dataSource={list} columns={columns} bordered />
      </Spin>
    </Card>
  )
}

export default connect(state => ({
  ...state.price,
}))(Price)
