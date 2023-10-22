<template>
  <div ref="echartsContainer" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";

const echartsContainer = ref(null)
let tmp = 10
const chart = () => {
  const myChart = echarts.init(echartsContainer.value)

  let data = [];
  let data2 = [];
  let now = new Date(1997, 9, 3);
  let now2 = new Date(1998, 9, 3);
  const oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  let value2 = Math.random() * 1000;

  for (let i = 0; i < 1000; i++) {
    data.push(randomData());
    data2.push(randomData2());
  }

  interface DataItem {
    name: string;
    value: [string, number];
  }

  function randomData(): DataItem {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - tmp;
    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        Math.round(value)
      ]
    };
  }
  function randomData2(): DataItem {
    now2 = new Date(+now2 + oneDay);

    value2 = value2 + Math.random() * 21 - 10;
    return {
      name: now2.toString(),
      value: [
        [now2.getFullYear(), now2.getMonth() + 1, now2.getDate()].join('/'),
        Math.round(value)
      ]
    };
  }

  let option = {
    title: {
      text: 'Speed'
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },

    series: [
      {
        name: 'Data',
        type: 'line',
        showSymbol: false,
        emphasis: {
          disable: false,
          focus: 'self'
        }
      },
      {
        name: 'Data2',
        type: 'line',
        showSymbol: false,
        emphasis: {
          disable: false,
          focus: 'self'
        }
      }
    ],
    legend: {
      right: 10,
      top: 20,
      bottom: 20,

    }
  }

  setInterval(function () {
    for (let i = 0; i < 5; i++) {
      data.shift();  // 清除第一条数据
      let v = randomData()
      let v2 = randomData2()
      data.push(v);  // 数据最后添加数据
      data2.shift();
      data2.push(v2)
    }

    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          data: data
        },
        {
          data: data2
        }
      ]
    });
  }, 1000);

  option && myChart.setOption(option);
}

onMounted(() => {
  chart()
})


</script>

<style lang="scss" scoped>

</style>