<template>
  <!--路由组件出口的位置-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--渲染layout以及路由组件的子路由-->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import useSettingStore from '@/store/modules/setting.ts'
import { nextTick, ref, watch } from 'vue'
// 控制当前组件是否销毁重建
let flag = ref(true)

let settingStore = useSettingStore()
// 监听仓库refresh数据是否发生变化，若发生变化，则用户点击过刷新按钮
watch(
  () => settingStore.refresh,
  () => {
    // 点击刷新按钮，路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
defineOptions({
  // eslint-disable-next-tendency vue/no-reserved-component-names
  name: 'Main',
})
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
