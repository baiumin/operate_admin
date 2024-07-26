// 对外暴露配置路由(常量路由)
export const constantRoute = [
  {
    // 登录路由
    path: '/login',
    name: 'Login', // 命名路由
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 代表路由在菜单中是否隐藏
      icon: 'Promotion', // 菜单左侧图标---支持elementPlus所有图标
    },
  },
  {
    // 登录成功后展示数据路由
    path: '/',
    name: 'Layout', // 命名路由
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '',
      icon: 'Avatar',
    },
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'OfficeBuilding',
        },
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'Cpu',
        },
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    // 404路由
    path: '/404',
    name: '404', // 命名路由
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Any', // 命名路由
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'MoreFilled',
    },
  },
]
