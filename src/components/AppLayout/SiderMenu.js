import React from 'react'
import { Menu, Icon } from 'antd'
import { withRouter, Link } from 'dva/router'

import { menuList } from '../../models/menuData'

const { SubMenu, Item: MenuItem } = Menu

function generateMenus(menuList) {
  return menuList.map(menuItem => {
    if (menuItem.children && menuItem.children.length > 0) {
      return (
        <SubMenu
          key={menuItem.key}
          title={
            <>
              {menuItem.iconType && <Icon type={menuItem.iconType} />}
              <span>{menuItem.title}</span>
            </>
          }
        >
          {generateMenus(menuItem.children)}
        </SubMenu>
      )
    }

    return (
      <MenuItem key={menuItem.key}>
        <Link to={menuItem.path}>
          {menuItem.iconType && <Icon type={menuItem.iconType} />}
          <span>{menuItem.title}</span>
        </Link>
      </MenuItem>
    )
  })
}

function SiderMenu({ location }) {
  const { pathname } = location
  let key

  if (pathname === '/') {
    key = 'company'
  } else {
    key = pathname.substring(pathname.indexOf('/') + 1)
  }

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[key]} defaultOpenKeys={['company']} style={{ height: '100%' }}>
      {generateMenus(menuList)}
    </Menu>
  )
}

export default withRouter(SiderMenu)
