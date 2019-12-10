import React from 'react'
import { Layout } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import cookies from 'js-cookie'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import HeaderNav from './components/AppLayout/HeaderNav'
import SiderMenu from './components/AppLayout/SiderMenu'
import MainContent from './components/AppLayout/MainContent'
import MainBreadcrumb from './components/AppLayout/MainBreadcrumb'
import Login from './pages/Produce/Login'

import './App.css'

const { Header, Sider, Content } = Layout

function App({ siderMenuCollapsed }) {
  const linkText = '乐高生产管理系统'
  const userName = cookies.get('userName')
  if (!userName) {
    return <Login />
  }

  return (
    <ConfigProvider locale={zhCN}>
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
          <Header className="header">
            <HeaderNav />
          </Header>
          <Content className="content">
            <MainBreadcrumb />
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default connect(state => ({ ...state.common }))(App)
