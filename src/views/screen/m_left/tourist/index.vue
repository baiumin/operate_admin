<template>
  <div class="box">
    <div class="box_t">
      <div class="box_title">
        <p>实时游客统计</p>
        <img src="@/assets/images/screen/dataScreen-title.png" alt="" />
      </div>
      <p class="box_txt">
        可预约总量
        <em>9999999</em>
        人
      </p>
    </div>
    <div class="box_c">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
      <span>人</span>
    </div>
    <div class="box_b" ref="chart"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

let people = ref('216908')
let chart = ref()

onMounted(() => {
  // 获取echarts类实例
  let myChart = echarts.init(chart.value)
  // 配置实例的配置项
  myChart.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [0.5, 0.4, 0.45],
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: '#0061A2',
              },
              {
                offset: 0,
                color: '#00FFE5',
              },
            ],
            globalCoord: false,
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: '#0061A2',
              },
              {
                offset: 0,
                color: '#00FFE5',
              },
            ],
            globalCoord: false,
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: '#0061A2',
              },
              {
                offset: 0,
                color: '#00FFE5',
              },
            ],
            globalCoord: false,
          },
        ],
        backgroundStyle: {
          borderWidth: 1,
          borderColor: '#14c0a3',
          color: 'transparent',
        }, //背景
        emphasis: {
          itemStyle: {
            opacity: 0.9,
          },
        },
        radius: '80%',
        outline: {
          show: true,
          borderDistance: 6,
          itemStyle: {
            color: 'none',
            borderType: 'dashed',
            borderColor: '#2bcae1',
            borderWidth: 2,
          },
        }, //外边框
      },
    ],
  })
})
defineOptions({ name: 'Tourist' })
</script>

<style scoped lang="scss">
.box {
  background: url('@/assets/images/screen/dataScreen-main-lt.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;

  .box_t {
    flex: 1;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    //padding-bottom: 5px;

    .box_title {
      height: 100%;
      font-size: 18px;
    }

    .box_txt {
      font-size: 14px;
      margin-right: 10px;

      em {
        color: #e36e00;
        margin: 0 5px;
      }
    }
  }

  .box_c {
    flex: 1;
    //background: #4569ca;
    padding: 20px 10px 0 20px;
    display: flex;
    gap: 1px;

    span {
      background: url('@/assets/images/screen/total.png') no-repeat;
      background-size: 100% 100%;
      flex: 1;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: #29fcff;
    }
  }

  .box_b {
    flex: 5.5;
  }
}
</style>
