<template>
  <!-- svg:图标外层容器节点,内部需要与use标签结合使用 -->
  <svg :style="{ width, height }">
    <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
    <!-- use标签fill属性可以设置图标的颜色 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
// 接受父组件传递过来的参数
defineProps({
  // :xlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 接收图标名字
  name: String,
  // 接收图标颜色
  color: {
    type: String,
    default: '',
  },
  // 接收图标宽度
  width: {
    type: String,
    default: '100px',
  },
  // 接收图标高度
  height: {
    type: String,
    default: '100px',
  },
})
</script>

<style scoped></style>
