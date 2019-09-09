import React from 'react'
import { Layout } from 'antd'

import HeaderNav from './components/AppLayout/HeaderNav'
import SiderMenu from './components/AppLayout/SiderMenu'
import MainContent from './components/AppLayout/MainContent'

const { Header, Sider, Content } = Layout

function App() {
  return (
    <Layout>
      <Header>
        <HeaderNav />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <SiderMenu />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 'calc(100vh - 64px)' }}>
          <MainContent />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
