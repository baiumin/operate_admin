<template>
  <div class="logo" v-show="setting.logoHidden">
    <img :src="setting.logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Logo',
})
import setting from '@/setting.ts'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;

  img {
    width: $base-menu-logo-height;
    height: $base-menu-logo-height;
    margin: 0 10px;
  }

  p {
    color: white;
    font-size: $base-menu-logo-fontsize;
    font-weight: 700;
  }
}
</style>
