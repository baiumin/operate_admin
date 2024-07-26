<template>
  <div class="box">
    <div class="box_t">
      <div class="box_title">
        <p>年度游客量对比</p>
        <img src="@/assets/images/screen/dataScreen-title.png" alt="" />
      </div>
    </div>
    <div class="box_c" ref="chart"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let chart = ref()

onMounted(() => {
  let myChart = echarts.init(chart.value)
  myChart.setOption({
    grid: {
      top: 30,
      left: 20,
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      name: '(人数)',
      nameLocation: 'end',
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
    },
    legend: {
      data: ['2021年', '2022年'],
      textStyle: {
        color: 'white',
      },
    },
    series: [
      {
        name: '2021年',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 1,
          color: 'rgba(128,255,165,0.94)',
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(128,255,165,0.87)',
            },
            {
              offset: 1,
              color: 'rgba(1,191,236,0.09)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [190, 100, 150, 0, 100, 120, 110, 50, 10, 500, 400, 200],
      },
      {
        name: '2022年',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 1,
          color: 'rgba(227,255,128,0.94)',
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(227,255,128,0.7)',
            },
            {
              offset: 1,
              color: 'rgba(73,83,42,0.15)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [200, 500, 400, 200, 400, 150, 300, 150, 160, 150, 50, 0],
      },
    ],
  })
})
defineOptions({ name: 'Contrast' })
</script>

<style scoped lang="scss">
.box {
  background: url('@/assets/images/screen/dataScreen-main-rc.png') no-repeat;
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
  }

  .box_c {
    flex: 4;
  }
}
</style>
