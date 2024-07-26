<template>
  <div class="screen">
    <div class="container" ref="screen">
      <div class="head">
        <Head />
      </div>
      <div class="main">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Tendency class="tendency" />
        </div>
        <div class="right">
          <Ranking class="ranking" />
          <Contrast class="contrast" />
          <Statistics class="statistics" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//获取数据大屏展示内容盒子的dom
import { onMounted, ref } from 'vue'
import Head from '@/views/screen/header/index.vue'
import Tourist from '@/views/screen/m_left/tourist/index.vue'
import Sex from '@/views/screen/m_left/sex/index.vue'
import Age from '@/views/screen/m_left/age/index.vue'
import Map from '@/views/screen/m_center/map/index.vue'
import Tendency from '@/views/screen/m_center/tendency/index.vue'
import Ranking from '@/views/screen/m_right/ranking/index.vue'
import Contrast from '@/views/screen/m_right/contrast/index.vue'
import Statistics from '@/views/screen/m_right/statistics/index.vue'

let screen = ref()

// 定义大屏缩放比例
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
// 监视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
defineOptions({ name: 'Screen' })
</script>

<style scoped lang="scss">
.screen {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/screen/bg.png') no-repeat;
  background-size: cover;

  .container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    width: 1920px;
    height: 1080px;
    //background: #4569ca;
    display: flex;
    flex-direction: column;

    .head {
      width: 100%;
      height: 40px;
      //background: #16C2A3;
    }

    .main {
      display: flex;
      flex: 1;
      padding: 10px 20px;
      //background: #16C2A3;

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .tourist {
          flex: 1.2;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 2.7;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 80px 50px 0;

        .map {
          flex: 2.5;
        }

        .tendency {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .ranking {
          flex: 1.2;
        }

        .contrast {
          flex: 1;
        }

        .statistics {
          flex: 1;
        }
      }
    }
  }
}
</style>
