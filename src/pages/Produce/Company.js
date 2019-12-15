import React, { useEffect } from 'react'
import { Card } from 'antd'
import { connect } from 'dva'
import InfoForm from '../../components/Produce/InfoForm'
import cookies from 'js-cookie'

const moduleName = 'company'

const infoItems = [
  {
    type: 'input',
    name: 'companyName',
    displayName: '公司名称',
  },
  {
    type: 'input',
    name: 'description',
    displayName: '公司描述',
  },
  {
    type: 'input',
    name: 'contact',
    displayName: '联系人',
  },
  {
    type: 'input',
    name: 'address',
    displayName: '公司地址',
  },
  {
    type: 'input',
    name: 'telephone',
    displayName: '联系电话',
  },
]

function Company({ dispatch, record }) {
  useEffect(() => {
    dispatch({
      type: `${moduleName}/getRecord`,
      payload: {
        id: cookies.get('companyId'),
      },
    })
  }, [dispatch])

  function modifyRecord(values) {
    const payload = {
      ...record,
      ...values,
    }

    return dispatch({
      type: `${moduleName}/updateRecord`,
      payload,
    }).then(data => {
      dispatch({
        type: `${moduleName}/saveRecord`,
        payload: data.data,
      })
    })
  }

  return (
    <Card>
      <InfoForm infoItems={infoItems} modifyRecord={modifyRecord} record={record} />
    </Card>
  )
}

export default connect(state => ({
  ...state.company,
}))(Company)
