import React, { useEffect } from 'react'
import { connect } from 'dva'

function Company({ dispatch }) {
  useEffect(() => {
    dispatch({
      type: 'company/fetchList',
    })
  }, [dispatch])

  return <div>我是第一个页面</div>
}

export default connect(state => ({
  ...state.company,
}))(Company)
