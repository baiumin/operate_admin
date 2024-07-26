<template>
  <div class="tabbar_left">
    <BreadCrumb />
  </div>
  <div class="tabbar_right">
    <ToolBar />
  </div>
</template>

<script lang="ts" setup>
import BreadCrumb from '@/views/layout/tabbar/breadcrumb/index.vue'
import ToolBar from '@/views/layout/tabbar/toolBar/index.vue'

defineOptions({
  name: 'Tabbar',
})
</script>

<style scoped lang="scss">
.tabbar_left {
  display: flex;
  align-items: center;
}

.tabbar_right {
  display: flex;
  align-items: center;
}
</style>
