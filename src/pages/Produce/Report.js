import React, { useState } from 'react'
import { Card, Table, Spin } from 'antd'
import { connect } from 'dva'

import QueryForm from '../../components/Produce/QueryForm'

const moduleName = 'report'
const moduleCnName = '报表'

const queryItems = [
  {
    type: 'rangepicker',
    name: 'time',
    displayName: '起始时间',
  },
]

function Report({ dispatch, list, pageInfo, loading }) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showTotal,
  })
  const [queryParams, setQueryParams] = useState({})

  function queryRecord(values) {
    const { time = [] } = values
    const createTime = []

    if (time.length === 2) {
      createTime[0] = `${time[0].format('YYYY-MM-DD')} 00:00:00`
      createTime[1] = `${time[1].format('YYYY-MM-DD')} 23:59:59`
    }

    const payload = { createTimeStart: createTime[0], createTimeEnd: createTime[1], pageNo: 1, pageSize: pagination.pageSize }
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

  function showTotal(total) {
    return `共 ${total} 员工`
  }

  const { employee = [], flow = [], orderSizeCost = [] } = list
  const columns = [
    {
      title: '工序名称',
      dataIndex: 'flowName',
      key: 'flowName',
      width: 100,
    },
    ...employee.map(item => ({
      title: item.employeeName,
      dataIndex: item.employeeId,
      key: item.employeeId,
      width: 100,
    })),
  ]
  const records = []

  if (orderSizeCost.length) {
    records.push(
      ...flow.map(item => {
        const temp = {}
        // 找到该工序下的所有订单信息
        const orderList = orderSizeCost.filter(v => v.flowId === item.flowId)

        orderList.forEach(order => {
          temp[order.employeeId] = `${order.size}件/${order.cost}元`
        })

        temp.flowName = `${item.flowName} (编号:${item.flowId})`

        return temp
      })
    )

    const sum = { flowName: '汇总' }
    employee.forEach(item => {
      if (item.totalSize && item.totalCost) {
        sum[item.employeeId] = `${item.totalSize}件/${item.totalCost}元`
      }
    })
    records.push(sum)
  }

  return (
    <Card>
      <QueryForm queryItems={queryItems} queryRecord={queryRecord} buttonText={{ queryButtonText: '生成报表' }} />
      <Spin tip="努力加载中..." spinning={loading.list || false}>
        <Table
          size="middle"
          dataSource={records}
          columns={columns}
          bordered
          onChange={tableChange}
          pagination={{ ...pagination, total: pageInfo.total }}
          rowKey="id"
        />
      </Spin>
    </Card>
  )
}

export default connect(state => ({
  ...state.report,
}))(Report)
