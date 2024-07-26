<template>
  <div class="box">
    <div class="box_t">
      <div class="box_title">
        <p>年龄比例</p>
        <img src="@/assets/images/screen/dataScreen-title.png" alt="" />
      </div>
    </div>
    <div class="box_c" ref="chart">1</div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let chart = ref()

onMounted(() => {
  let myChart = echarts.init(chart.value)
  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '10%',
      right: '5%',
      orient: 'vertical',
      textStyle: {
        color: 'white',
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '90%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        right: '30%',
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: true,
          position: 'inner',
          formatter: '{d}%',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '10岁以下' },
          { value: 735, name: '10-18岁' },
          { value: 580, name: '18-30岁' },
          { value: 484, name: '30-40岁' },
          { value: 300, name: '40-60岁' },
          { value: 300, name: '60岁以上' },
        ],
      },
    ],
  }
  myChart.setOption(option)
})
defineOptions({ name: 'Age' })
</script>

<style scoped lang="scss">
.box {
  background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
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
