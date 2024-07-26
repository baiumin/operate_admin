// 创建用户相关的小仓库
// 创建用户小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { userState } from '@/store/modules/types/type.ts'
import { constantRoute } from '@/router/routes.ts'
import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type.ts'
// import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts' // 引入操作本地存储的工具方法

const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): userState => {
    return {
      token: '', // 用户唯一标识token
      username: '', // 用户姓名
      avatar: '', // 用户头像
      // token: GET_TOKEN(), // 利用封装的本地存储方法获取token
      menuRoutes: constantRoute, // 仓库存储生成菜单需要的数组(路由)
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录方法
    async userLogin(data: LoginFormData) {
      const result: LoginResponseData = await reqLogin(data)
      /*登录请求成功：200->token*/
      if (result.code === 200) {
        // pinia仓库存储以下token，可使用pinia插件默认持久化存储 persist: true,
        // pinia|vuex存储数据是利用js对象
        this.token = result.data
        // localStorage.setItem('token', result.data)
        // SET_TOKEN(result.data as string) //利用封装的本地存储方法存储token
        // 保证当前async函数返回一个成功的promise
        return 'OK'
      } else {
        /*登录请求失败：登录失败错误信息*/
        // console.log(result.data)
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息方法
    async userInfo() {
      // 获取用户信息，存储到仓库中[头像，姓名]
      const result: UserInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        // 保证当前async函数返回一个成功的promise
        return 'OK'
      } else {
        // 返回‘获取用户信息失败’错误
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录方法
    async userLogout() {
      // 退出登录接口(通知服务器本地用户唯一标识失效)
      const result: any = await reqLogout()
      if (result.code === 200) {
        // 退出登录成功
        this.token = ''
        this.username = ''
        this.avatar = ''
        // localStorage.removeItem('User')
        // REMOVE_TOKEN() // 也可使用封装的删除本地存储方法
        return 'OK'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
  persist: true, // 默认持久化
})
// 对外暴露获取小仓库方法
export default useUserStore
