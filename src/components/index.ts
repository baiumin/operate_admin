/**
 * 在index.ts中注册所有组件，统一由app.component注册
 * 向外暴露插件对象，再进行全局注册，实现统一管理
 */

// 引入项目所有全局组件
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
// 引入elementPlus提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import type { App, Component } from 'vue'
// 创建全局对象
const allGlobalComponent: { [name: string]: Component } = { SvgIcon, Category }

// 对外暴露插件对象
export default {
  install(app: App) {
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key: string) => {
      // 注册为全局组件
      app.component(key, allGlobalComponent[key])
    })
    // 将elementPlus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
