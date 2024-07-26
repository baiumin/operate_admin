<template>
  <el-icon
    style="margin-right: 15px; font-size: 24px; color: #cccccc; cursor: pointer"
    @click="menuFold"
  >
    <component :is="settingStore.isFold ? 'Expand' : 'Fold'" />
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="{ path: item.path }"
    >
      <div class="bread">
        <el-icon style="margin-right: 5px">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
// 引入layout设置相关小仓库
import useSettingStore from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'BreadCrumb',
})

// 获取layout设置相关的小仓库
let settingStore = useSettingStore()
const menuFold = () => {
  // 折叠图标切换
  settingStore.isFold = !settingStore.isFold
}

let $route = useRoute()
</script>

<style scoped lang="scss">
.bread {
  display: flex;
  align-items: center;
  color: #cccccc;
}
</style>
