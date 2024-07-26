<template>
  <div class="box">
    <div class="box_t">
      <div class="box_title">
        <p>预约渠道数据统计</p>
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
      top: '20%',
      left: '5%',
      orient: 'vertical',
      textStyle: {
        color: 'white',
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['60%', '90%'],
        avoidLabelOverlap: false,
        padAngle: 10,
        left: 100,
        itemStyle: {
          borderWidth: 10,
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
          { value: 40, name: '智慧文旅平台' },
          { value: 10, name: '携程' },
          { value: 20, name: '飞猪' },
          { value: 30, name: '其他渠道' },
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
  background: url('@/assets/images/screen/dataScreen-main-rb.png') no-repeat;
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
