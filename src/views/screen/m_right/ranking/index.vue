<template>
  <div class="box">
    <div class="box_t">
      <div class="box_title">
        <p>热门景区排行</p>
        <img src="@/assets/images/screen/dataScreen-title.png" alt="" />
      </div>
    </div>
    <div class="box_c">
      <div class="rank">
        <p>排行</p>
        <p>景区</p>
        <p style="margin-left: 40px">预约数量</p>
      </div>
    </div>
    <div class="box_b">
      <div class="rank_left">
        <div
          v-for="(item, index) in 5"
          :key="index"
          class="rank_i"
          :style="{ background: arr[index] }"
        >
          NO.{{ item }}
        </div>
      </div>
      <div class="rank_main" ref="chart"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let arr = ['#0087fc', '#ff7d70', '#48c2e2', '#ffb339', '#8c80f4']

let chart = ref()
onMounted(() => {
  let myChart = echarts.init(chart.value)
  myChart.setOption({
    yAxis: {
      type: 'category',
      data: ['北京故宫', '万里长城', '九寨沟', '华山', '峨眉山'],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 30,
        color: 'white',
      },
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: [100, 100, 100, 100, 100],
        showBackground: true,
        barWidth: 20,
        z: 100,
        backgroundStyle: {
          color: 'transparent',
          borderColor: '#fff',
          borderWidth: 1,
          borderRadius: 20,
        },
        itemStyle: {
          color: 'transparent',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [30, 40, 50, 60, 80],
        barWidth: 15,
        barGap: '-85%',
        label: {
          show: true,
          position: 'inside',
          color: 'white',
          formatter: '{c}%',
        },
        itemStyle: {
          borderRadius: 20,
          color: function (data: any) {
            return arr[data.dataIndex]
          },
        },
      },
    ],
    grid: {
      right: 0,
      top: 0,
      left: 90,
      bottom: 10,
    },
  })
})
defineOptions({ name: 'Ranking' })
</script>

<style scoped lang="scss">
.box {
  background: url('@/assets/images/screen/dataScreen-main-rt.png') no-repeat;
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
    flex: 0.8;
    padding: 10px;

    .rank {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      background: url('@/assets/images/screen/rankingChart-bg.png') no-repeat;
      background-size: 100% 100%;

      p {
        width: 20%;
        //background: #4569ca;
        text-align: center;
        color: #ffb700;
        font-size: 16px;
        font-weight: 550;
      }
    }
  }

  .box_b {
    flex: 5;
    padding: 0 10px;
    display: flex;

    .rank_left {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 5px 0;

      .rank_i {
        height: 15%;
        width: 80%;
        //background: #4569ca;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
    }

    .rank_main {
      flex: 1;
      //background: #4569ca;
    }
  }
}
</style>
