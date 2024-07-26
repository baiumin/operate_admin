// 小仓库：layout组件相关配置仓库

import { defineStore } from 'pinia'
import type { SettingState } from '@/store/modules/types/type.ts'

const useSettingStore = defineStore('Setting', {
  state(): SettingState {
    return {
      isFold: false, // 用户控制菜单是否折叠，默认否
      refresh: false, // 控制刷新效果
    }
  },
})
export default useSettingStore
