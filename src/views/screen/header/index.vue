<template>
  <div class="header">
    <div class="left">
      <span class="l_btn" @click="$router.push('/home')">首页</span>
    </div>
    <div class="center">智慧旅游可视化大数据平台</div>
    <div class="right">
      <span class="r_btn">统计报告</span>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import moment from 'moment'

const $router = useRouter()
const time = ref(moment().format('YYYY-MM-DD:hh-mm-ss'))
let timer = ref(0)

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY-MM-DD:hh-mm-ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
defineOptions({ name: 'Head' })
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    flex: 1;
    background: url('@/assets/images/screen/dataScreen-header-left-bg.png')
      no-repeat;
    background-size: cover;

    .l_btn {
      float: right;
      width: 135px;
      height: 100%;
      background: url('@/assets/images/screen/dataScreen-header-btn-bg-l.png')
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }
  }

  .center {
    flex: 1.5;
    height: 74px;
    background: url('@/assets/images/screen/dataScreen-header-center-bg.png')
      no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 74px;
    color: #29fcff;
    font-size: 30px;
  }

  .right {
    flex: 1;
    background: url('@/assets/images/screen/dataScreen-header-right-bg.png')
      no-repeat;
    background-size: 100% 100%;
    display: flex;

    .r_btn {
      width: 135px;
      height: 100%;
      background: url('@/assets/images/screen/dataScreen-header-btn-bg-r.png')
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
    }

    .time {
      flex: 1;
      height: 100%;
      line-height: 40px;
      text-align: center;
      color: #28b2de;
    }
  }
}
</style>
