/**
 * 进行axios二次封装
 * 使用请求与响应拦截器
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'

/**
 * 第一步：创建axios实例
 * 利用axios对象的create方法，创建axios实例
 * 其他配置：基础路径、超时时间等等
 */
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带/api
  timeout: 5000, // 超时时间设置
})

/**
 * 第二步：request实例添加请求拦截器
 * config：配置对象  headers：属性请求头，经常给服务器端携带公共参数
 */
request.interceptors.request.use((config) => {
  // 获取用户小仓库，获取小仓库内部token，登陆成功后携带给服务器
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  // 返回配置对象
  return config
})
/**
 * 第三步：request实例添加相应拦截器
 */
request.interceptors.response.use(
  (response) => {
    // 成功回调
    // 简化数据
    return response.data
  },
  (error) => {
    // 失败回调：处理http网络请求
    // 定义一个变量：存储网络错误信息
    let msg = ''
    // http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'TOKEN过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '网络出现问题'
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message: msg,
    })

    return Promise.reject(error)
  },
)

// 对外暴露
export default request
