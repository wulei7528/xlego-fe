import dynamic from 'dva/dynamic'

/**
 * menuList: 菜单栏信息用于1.展示导航 2.生成路由信息
 * key: 唯一标识一个menu项
 * title: 页面标题文本
 * children: 如果是父级菜单，存在子级菜单，叶子菜单此项忽略
 * path: 叶子菜单此项必填，父级菜单此项忽略
 * component: 叶子菜单点击跳转后对应的加载组件
 */
export const menuList = [
  {
    key: 'company',
    title: '公司信息管理',
    iconType: 'team',
    path: '/company',
    component: dynamic({
      component: () => import('../pages/Produce/Company'),
    }),
  },
  {
    key: 'employee',
    title: '员工管理',
    iconType: 'user',
    path: '/employee',
    component: dynamic({
      component: () => import('../pages/Produce/Employee'),
    }),
  },
  {
    key: 'flow',
    title: '工序管理',
    iconType: 'interaction',
    path: '/flow',
    component: dynamic({
      component: () => import('../pages/Produce/Flow'),
    }),
  },
  {
    key: 'price',
    title: '工序历史价格查看',
    iconType: 'pay-circle',
    path: '/price',
    component: dynamic({
      component: () => import('../pages/Produce/Price'),
    }),
  },
  {
    key: 'order',
    title: '订单管理',
    iconType: 'ordered-list',
    path: '/order',
    component: dynamic({
      component: () => import('../pages/Produce/Order'),
    }),
  },
]

// 将菜单列表过滤，抽取出所有路由信息-类似数组的扁平化处理
export function getRouteData(menuList) {
  const routes = []

  menuList.forEach(menuItem => {
    if (Array.isArray(menuItem.children)) {
      routes.push(...getRouteData(menuItem.children))
    } else {
      routes.push(menuItem)
    }
  })

  return routes
}
