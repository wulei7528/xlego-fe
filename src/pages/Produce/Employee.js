import React, { useEffect } from 'react'
import { Table, Button } from 'antd'
import { connect } from 'dva'

const moduleName = 'employee'

const columns = [
  {
    title: '车工名字',
    dataIndex: 'employeeName',
    key: 'employeeName',
  },
  {
    title: '级别',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '联系电话',
    dataIndex: 'telephone',
    key: 'telephone',
  },
]

function Employee({ dispatch, list }) {
  useEffect(() => {
    dispatch({
      type: `${moduleName}/fetchList`,
    })
  }, [dispatch])

  return (
    <div>
      <div style={{ margin: '10px 0' }}>
        <Button type="primary" style={{ marginRight: '16px' }}>
          新增
        </Button>
        <Button>删除</Button>
      </div>
      <Table dataSource={list} columns={columns} />
    </div>
  )
}

export default connect(state => ({
  ...state.employee,
}))(Employee)
