import React from 'react'
import { Layout } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'

import HeaderNav from './components/AppLayout/HeaderNav'
import SiderMenu from './components/AppLayout/SiderMenu'
import MainContent from './components/AppLayout/MainContent'
import MainBreadcrumb from './components/AppLayout/MainBreadcrumb'

import './App.css'

const { Header, Sider, Content } = Layout

function App({ siderMenuCollapsed }) {
  const linkText = '乐高生产管理系统'
  return (
    <Layout>
      <Sider collapsible collapsed={siderMenuCollapsed}>
        <div className="logo">
          <Link to="/">
            <h1>{linkText}</h1>
          </Link>
        </div>
        <SiderMenu />
      </Sider>
      <Layout>
        <Header className="top_header">
          <HeaderNav />
        </Header>
        <Content style={{ padding: '0 24px', minHeight: 'calc(100vh - 64px)' }}>
          <MainBreadcrumb />
          <MainContent />
        </Content>
      </Layout>
    </Layout>
  )
}

export default connect(state => ({ ...state.common }))(App)
