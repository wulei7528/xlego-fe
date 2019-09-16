import React, { useEffect } from 'react'
import { Card } from 'antd'
import { connect } from 'dva'

const moduleName = 'company'
const moduleCnName = '公司'

function Company({ dispatch }) {
  useEffect(() => {
    dispatch({
      type: `${moduleName}/fetchList`,
    })
  }, [dispatch])

  return <Card title={`${moduleCnName}信息`}></Card>
}

export default connect(state => ({
  ...state.company,
}))(Company)
