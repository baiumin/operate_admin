<template>
  <div class="box">
    <div class="box_t">
      <div class="box_title">
        <p>男女比例</p>
        <img src="@/assets/images/screen/dataScreen-title.png" alt="" />
      </div>
    </div>
    <div class="box_c">
      <div class="sex_man">
        <p>男士</p>
        <div class="sex_i">
          <img src="@/assets/images/screen/man.png" alt="" />
        </div>
      </div>
      <div class="sex_woman">
        <p>女士</p>
        <div class="sex_i">
          <img src="@/assets/images/screen/woman.png" alt="" />
        </div>
      </div>
    </div>
    <div class="box_b">
      <div class="box_main" ref="chart"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let chart = ref()

onMounted(() => {
  let myChart = echarts.init(chart.value)

  myChart.setOption({
    /*title: {
      text: '男女比例',//主标题
      textStyle: {//主标题颜色
        color: 'skyblue'
      },
      left: '40%'
    },*/
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [60],
        barWidth: 28,
        z: 100,
        itemStyle: {
          color: '#007afe',
          borderRadius: 20,
        },
        label: {
          show: true,
          formatter: '{c}%',
          fontSize: 16,
          fontWeight: '550',
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 28,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: '#ff4b7a',
          borderRadius: 20,
        },
        label: {
          show: true,
          formatter: '40%',
          fontSize: 16,
          fontWeight: '550',
          offset: [80, 0],
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})

defineOptions({ name: 'Sex' })
</script>

<style scoped lang="scss">
.box {
  background: url('@/assets/images/screen/dataScreen-main-lc.png') no-repeat;
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
    flex: 1;
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;

    .sex_man {
      width: 30%;
      aspect-ratio: 1;
      background: url('@/assets/images/screen/man-bg.png') no-repeat;
      background-size: 100% 100%;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .sex_i {
        //background: #cccccc;
        flex: 1;
        display: flex;
        align-items: center;
      }
    }

    .sex_woman {
      width: 30%;
      aspect-ratio: 1;
      background: url('@/assets/images/screen/woman-bg.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .sex_i {
        //background: #cccccc;
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }

  .box_b {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .box_main {
      width: 65%;
      height: 50%;
      //background: white;
    }
  }
}
</style>
