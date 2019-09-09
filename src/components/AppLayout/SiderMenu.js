import React from 'react'
import { Menu } from 'antd'

import NavLink from './NavLink'
import { menuList } from '../../models/menuData'

const { SubMenu, Item: MenuItem } = Menu

function generateMenu(menuList) {
  return menuList.map(menuItem => {
    if (menuItem.children && menuItem.children.length > 0) {
      return (
        <SubMenu key={menuItem.key} title={menuItem.title}>
          {generateMenu(menuItem.children)}
        </SubMenu>
      )
    }

    return (
      <MenuItem key={menuItem.key}>
        <NavLink target={menuItem.path} linkText={menuItem.title} />
      </MenuItem>
    )
  })
}

function SiderMenu() {
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
      {generateMenu(menuList)}
    </Menu>
  )
}

export default SiderMenu
