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
    children: [
      {
        key: 'company1',
        title: '更新公司信息',
        path: '/company',
        component: dynamic({
          component: () => import('../pages/Produce/Company'),
        }),
      },
    ],
  },
  {
    key: 'staff',
    title: '员工管理',
    path: '/staff',
  },
  {
    key: 'flow',
    title: '工序管理',
    path: '/flow',
  },
  {
    key: 'price',
    title: '价格管理',
    path: '/price',
  },
  {
    key: 'order',
    title: '订单管理',
    path: '/order',
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
