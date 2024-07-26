import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus' // 引入element-plus插件
import 'element-plus/dist/index.css' // 引入element-plus样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//@ts-expect-error 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register' // svg插件需要配置代码
import globalComponent from '@/components' // 引入自定义插件对象：注册整个项目全局组件
import '@/styles/index.scss' // 引入模版的全局样式
import router from '@/router' // 引入模版路由
import pinia from '@/store' // 引入仓库
import './permission.ts' // 引入路由鉴权

// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件，并使用中文样式
app.use(ElementPlus, {
  locale: zhCn,
})
// 安装自定义插件
app.use(globalComponent)
// 注册模版路由
app.use(router)
// 安装仓库pinia
app.use(pinia)
// 将应用挂载到挂载点
app.mount('#app')
