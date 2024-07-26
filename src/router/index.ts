// 通过vue-router插件实现模版路由配置

// 创建路由器
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from '@/router/routes.ts'

const router = createRouter({
  // 路由模式history
  history: createWebHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
