// 路由鉴权,鉴权：在页面进行路由跳转时，对当前用户进行鉴定，有没有权限跳转到目标页面
import router from '@/router'
import NProgress from 'nprogress' //引入进度条插件
import 'nprogress/nprogress.css' //引入进度条样式
import pinia from '@/store'
import useUserStore from '@/store/modules/user.ts'
import setting from '@/setting.ts'

// 全局守卫：项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  /**
   * to:将要访问哪个路由
   * from:从哪个路由来
   * next:路由的放行函数
   */
  document.title = `${setting.title} - ${to.meta.title}`
  const userStore = useUserStore(pinia)
  // 进度条显示
  NProgress.start()
  // 获取token，判断用户登录状态
  const token = userStore.token
  if (token) {
    // 登录成功后,不能回退访问login,指向首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 登录成功访问其余路由,登录除外
      // 存在用户信息
      if (userStore.username) {
        // 放行
        next()
      } else {
        // 如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        await userStore
          .userInfo()
          .then(() => {
            next()
          })
          .catch(async () => {
            await userStore.userLogout()
            next({
              path: '/login',
              query: { redirect: to.path },
            })
          })
      }
    }
  } else {
    // 未登录
    if (to.path == '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.path },
      })
    }
  }
})
// 全局后置守卫
router.afterEach((to, from) => {
  // 进度条显示完成
  NProgress.done()
})

/**
 * 1、任意路由切换实现进度条业务 --- nprogress
 * 2、路由鉴权(路由组件访问权限的设置)
 *    用户登录成功：不可访问回退路径访问login，除非退出登录
 *    用户未登录：不可直接通过路径跳转其余路由
 */

//全局进度条的配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 2000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
})
