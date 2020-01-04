import React, { useState } from 'react'
import { Tabs } from 'antd'

import OrderList from './OrderList'
import BatchOrder from './BatchOrder'

const { TabPane } = Tabs

function Order({ dispatch }) {
  const [activeKey, setActiveKey] = useState('1')

  function tabChange(tabKey) {
    setActiveKey(tabKey)
  }

  return (
    <Tabs onChange={tabChange}>
      <TabPane tab="订单列表" key="1">
        {activeKey === '1' && <OrderList />}
      </TabPane>
      <TabPane tab="批量订单管理" key="2">
        {activeKey === '2' && <BatchOrder />}
      </TabPane>
    </Tabs>
  )
}

export default Order
