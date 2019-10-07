import React, { useEffect } from 'react'
import { Card } from 'antd'
import { connect } from 'dva'
import InfoForm from '../../components/Produce/InfoForm'

const moduleName = 'company'
const moduleCnName = '公司'

const infoItems = [
  {
    type: 'input',
    name: 'companyName',
    displayName: '公司名称',
  },
  {
    type: 'input',
    name: 'desc',
    displayName: '公司描述',
  },
  {
    type: 'input',
    name: 'contact',
    displayName: '联系人',
  },
  {
    type: 'input',
    name: 'telephone',
    displayName: '联系电话',
  },
]

function Company({ dispatch }) {
  useEffect(() => {
    dispatch({
      type: `${moduleName}/fetchList`,
    })
  }, [dispatch])

  function modifyRecord(values) {
    dispatch({
      type: `${moduleName}/updateRecord`,
      payload: values,
    })
  }

  return (
    <Card>
      <InfoForm infoItems={infoItems} modifyRecord={modifyRecord} />
    </Card>
  )
}

export default connect(state => ({
  ...state.company,
}))(Company)
