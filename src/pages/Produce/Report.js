import React, { useState } from 'react'
import { Card, Table, Spin, message } from 'antd'
import { connect } from 'dva'
import XLSX from 'xlsx'

import './index.css'

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

  function exportExcel(values) {
    const { time = [] } = values
    const createTime = []

    if (time.length !== 2) {
      message.error('请选择导出的日期范围')
      return
    }

    if (time.length === 2) {
      createTime[0] = `${time[0].format('YYYY-MM-DD')} 00:00:00`
      createTime[1] = `${time[1].format('YYYY-MM-DD')} 23:59:59`
    }

    const payload = { createTimeStart: createTime[0], createTimeEnd: createTime[1] }

    dispatch({
      type: `${moduleName}/fetchListAll`,
      payload,
    }).then(data => {
      if (data.code) {
        message.error(data.msg || '获取全量数据错误')
        return
      }

      const title = `${createTime[0]}- ${createTime[1]}报表`
      xlsx(data.data, title)
    })
  }

  async function xlsx(data, title) {
    const { employee = [], flow = [], orderSizeCost = [] } = data

    const header = ['工序名称', ...employee.map(item => item.employeeName)]

    if (orderSizeCost.length === 0) {
      message.error('当前时间段报表订单信息为空，请重新选择')
      return
    }

    const res = flow.map(item => {
      // 找到该工序下的所有订单信息
      const orderList = orderSizeCost.filter(v => v.flowId === item.flowId)
      return [
        item.flowName,
        ...employee.map(subItem => {
          const order = orderList.find(order => order.employeeId === subItem.employeeId)
          if (!order) {
            return ''
          }
          return `${order.size}件/${order.cost}元`
        }),
      ]
    })

    const sum = ['汇总', ...employee.map(item => (item.totalSize && item.totalCost ? `${item.totalSize}件/${item.totalCost}元` : ''))]

    res.unshift(header)
    res.push(sum)
    const worksheet = XLSX.utils.aoa_to_sheet(res)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '报表数据')

    XLSX.writeFile(workbook, `${title}.xlsx`)
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

  function generateColumns(data) {
    return [
      {
        title: '工序名称',
        dataIndex: 'flowName',
        key: 'flowName',
        width: 100,
      },
      ...data.map(item => ({
        title: item.employeeName,
        dataIndex: item.employeeId,
        key: item.employeeId,
        width: 100,
      })),
    ]
  }

  const { employee = [], flow = [], orderSizeCost = [] } = list
  const columns = generateColumns(employee)
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
      <QueryForm queryItems={queryItems} queryRecord={queryRecord} exportExcel={exportExcel} buttonText={{ queryButtonText: '生成报表' }} />
      <Spin tip="努力加载中..." spinning={loading.list || false}>
        <Table
          className="report-table"
          size="small"
          dataSource={records}
          columns={columns}
          bordered
          onChange={tableChange}
          pagination={{ ...pagination, total: pageInfo.total }}
          rowKey="flowName"
        />
      </Spin>
      <div>
        说明：单元格内容展示为员工 <span style={{ fontWeight: 'bold' }}>工序总件数/总费用</span>
      </div>
    </Card>
  )
}

export default connect(state => ({
  ...state.report,
}))(Report)
