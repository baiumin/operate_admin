<template>
  <div class="box">
    <div class="box_t">
      <div class="box_title">
        <p>未来30天游客量趋势图</p>
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
      left: '3%',
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
      data: [
        '7/01',
        '7/03',
        '7/05',
        '7/07',
        '7/09',
        '7/11',
        '7/13',
        '7/15',
        '7/17',
        '7/19',
        '7/21',
        '7/23',
        '7/25',
        '7/27',
        '7/29',
      ],
    },

    yAxis: {
      name: '(访问量)',
      nameLocation: 'end',
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
    },

    series: [
      {
        name: 'tendency',
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
        data: [
          12000, 3000, 14000, 8000, 18000, 9000, 2000, 7000, 13000, 8000, 4000,
          8000, 9000, 5000, 16000,
        ],
      },
    ],
  })
})
defineOptions({ name: 'Tendency' })
</script>

<style scoped lang="scss">
.box {
  background: url('@/assets/images/screen/dataScreen-main-cb.png') no-repeat;
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
