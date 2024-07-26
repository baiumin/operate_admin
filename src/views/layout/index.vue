<template>
  <div class="layout">
    <div class="slider">
      <Logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          active-text-color="yellowgreen"
          text-color="white"
          :default-active="$route.path"
          router
          :collapse="settingStore.isFold"
        >
          <SideMenu :menuList="useStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="tabbar" :class="{ menu_fold: settingStore.isFold }">
      <Tabbar />
    </div>
    <div class="main" :class="{ menu_fold: settingStore.isFold }">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting.ts'

defineOptions({
  name: 'Layout',
})
// 引入组件
import Logo from './logo/index.vue'
import SideMenu from './menu/index.vue'
import Main from '@/views/layout/main/index.vue'
import Tabbar from './tabbar/index.vue'
// 引入用户小仓库
import useUserStore from '@/store/modules/user.ts'

// 引入路由对象
import { useRoute } from 'vue-router'

// 获取用户相关的小仓库
let useStore = useUserStore()
// 获取路由对象
let $route = useRoute()
// 获取layout设置相关的小仓库
let settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.layout {
  width: 100px;
  height: 100vh;

  .slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    padding-top: 10px;
    transition: all 0.5s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height - 10px);
      overflow: auto;
      padding-top: 10px;

      .el-menu {
        border-right: none;
      }
    }
  }

  .tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    border-bottom: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    background-image: linear-gradient(to right, #001529, white, white);
    transition: all 0.5s;

    &.menu_fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }

  .main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: #eeeeee;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.5s;

    &.menu_fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
