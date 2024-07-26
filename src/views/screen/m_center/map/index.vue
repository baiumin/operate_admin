<template>
  <div class="box">
    <div class="box_t">景区实时客流量</div>
    <div class="box_main" ref="map">11</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'

let map = ref()
echarts.registerMap('china', chinaJSON as any)

onMounted(() => {
  let myChart = echarts.init(map.value)
  myChart.setOption({
    geo: [
      {
        map: 'china',
        top: 0,
        bottom: -100,
        label: {
          show: true,
          color: 'rgba(255,255,255,0.7)',
        },
        itemStyle: {
          areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0,66,149,0.5)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(4,0,72,0.7)', // 100% 处的颜色
              },
            ],
          },
          shadowColor: 'rgba(0,187,255,0.51)',
          shadowBlur: 30,
          borderColor: '#00bbff', //描边颜色
        },
        emphasis: {
          label: {
            color: 'white',
          },
          itemStyle: {
            areaColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  // color: 'rgba(0, 252, 255, 1)' // 0% 处的颜色
                  color: '#073684', // 0% 处的颜色
                },
                {
                  offset: 1,
                  // color: 'rgba(0, 252, 255, 0.5)' // 100% 处的颜色
                  color: '#040048B2', // 100% 处的颜色
                },
              ],
            },
          },
        },
      },
    ],
    series: [
      {
        type: 'lines',
        lineStyle: {
          color: 'rgba(255,255,255,0.09)',
          curveness: 0.2,
        },
        effect: {
          show: true,
          symbolSize: 6,
        },
        data: [
          {
            coords: [
              [113.280637, 23.125178],
              [119.306239, 26.075302],
            ],
          },
          {
            coords: [
              [113.280637, 23.125178],
              [91.132212, 29.660361],
            ],
          },
          {
            coords: [
              [113.280637, 23.125178],
              [108.320004, 22.82402],
            ],
          },
          {
            coords: [
              [113.280637, 23.125178],
              [87.617733, 43.792818],
            ],
          },
          {
            coords: [
              [113.280637, 23.125178],
              [126.642464, 45.756967],
            ],
          },
          {
            coords: [
              [113.280637, 23.125178],
              [106.278179, 38.46637],
            ],
          },
          {
            coords: [
              [113.280637, 23.125178],
              [114.173355, 22.320048],
            ],
          },
          {
            coords: [
              [113.280637, 23.125178],
              [113.54909, 22.198951],
            ],
          },
          {
            coords: [
              [113.280637, 23.125178],
              [121.509062, 25.044332],
            ],
          },
        ],
      },
    ],
  })
})
defineOptions({ name: 'Map' })
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .box_t {
    width: 300px;
    height: 30px;
    background: url('@/assets/images/screen/map-title-bg.png') no-repeat;
    background-size: 100% 100%;
    color: white;
    line-height: 30px;
    padding-left: 50px;
  }

  .box_main {
    flex: 1;
    //background: rgba(69, 105, 202, 0.37);
  }
}
</style>
