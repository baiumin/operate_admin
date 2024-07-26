<template>
  <el-button icon="Refresh" circle @click="doRefresh" />
  <el-button icon="FullScreen" circle @click="doFullScreen" />
  <el-button icon="Setting" circle @click="drawerVisible = true" />
  <el-drawer
    v-model="drawerVisible"
    title="主题设置"
    direction="rtl"
    append-to-body
    size="15%"
  >
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="doTheme"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          class="ml-2"
          style="--el-switch-on-color: rgba(0, 0, 0, 0.75)"
          active-action-icon="Moon"
          inactive-action-icon="Sunny"
          @change="doDark"
        />
      </el-form-item>
    </el-form>
  </el-drawer>
  <el-avatar
    :src="userStore.avatar"
    fit="fill"
    @error="errorHandler"
    style="margin: 0 8px 0 25px"
  >
    <img
      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      alt=""
    />
  </el-avatar>
  <el-dropdown>
    <span>
      {{ userStore.username }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="doLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import useSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

// 获取layout设置相关小仓库信息
let settingStore = useSettingStore()
// 获取用户相关小仓库信息
let userStore = useUserStore()
// 获取路由器
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
let drawerVisible = ref(false)
let dark = ref(false)

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 暗黑模式切换
const doDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
// 主题切换
const doTheme = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-success', color.value)
  html.style.setProperty('--el-color-primary', color.value)
  html.style.setProperty('--el-color-danger', color.value)
  html.style.setProperty('--el-color-warning', color.value)
  html.style.setProperty('--el-color-info', color.value)
}
// 退出登录点击回调
const doLogout = async () => {
  /**
   * 1、向服务器发请求[退出登录接口]，该项目无此接口。。。
   * 2、清空仓库相关数据[token|username|avatar]
   * 3、跳转到登录界面,优化：传递退出登录前所在路径
   */
  await userStore.userLogout()
  await $router.push({ path: '/login', query: { redirect: $route.path } })
  ElMessage({
    message: '退出登录成功',
    type: 'success',
  })
}
// 刷新按钮点击回调
const doRefresh = () => {
  settingStore.refresh = !settingStore.refresh
}
// 全屏按钮点击回调
const doFullScreen = () => {
  // DOM对象属性：判断当前是否为全屏模式[全屏：true,非全屏：false]
  let full = document.fullscreenElement
  // 进入全屏模式
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
// 头像显示失败的回退行为
const errorHandler = () => true
defineOptions({
  name: 'ToolBar',
})
</script>

<style scoped lang="scss">
.el-dropdown {
  cursor: pointer;
}

.el-button:hover {
  border: none;
  background: $base-menu-background;
}
</style>
