import React from 'react'
import { Menu, Icon } from 'antd'

import NavLink from './NavLink'
import { menuList } from '../../models/menuData'

const { SubMenu, Item: MenuItem } = Menu

function generateMenu(menuList) {
  return menuList.map(menuItem => {
    if (menuItem.children && menuItem.children.length > 0) {
      return (
        <SubMenu
          key={menuItem.key}
          title={
            <span>
              {menuItem.iconType ? <Icon type={menuItem.iconType} /> : ''}
              {menuItem.title}
            </span>
          }
        >
          {generateMenu(menuItem.children)}
        </SubMenu>
      )
    }

    return (
      <MenuItem key={menuItem.key}>
        {menuItem.iconType ? <Icon type={menuItem.iconType} /> : ''}
        <span>
          <NavLink target={menuItem.path} linkText={menuItem.title} />
        </span>
      </MenuItem>
    )
  })
}

function SiderMenu() {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['company']} defaultOpenKeys={['company']} style={{ height: '100%' }}>
      {generateMenu(menuList)}
    </Menu>
  )
}

export default SiderMenu
