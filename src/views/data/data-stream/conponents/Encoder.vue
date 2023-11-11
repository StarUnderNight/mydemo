<template>
  <div ref="echartsContainer" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";

const echartsContainer = ref(null)
const chart = () => {
  const myChart = echarts.init(echartsContainer.value)

  let data: DataItem[] = [];
  let now = new Date(2019, 9, 3);
  const oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  for (let i = 0; i < 1000; i++) {
    data.push(randomData());
  }

  interface DataItem {
    name: string;
    value: [string, number];
  }

  function randomData(): DataItem {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        Math.round(value)
      ]
    };
  }

  let option: { yAxis: { splitLine: { show: boolean }; type: string; boundaryGap: [number, string] }; xAxis: { splitLine: { show: boolean }; type: string }; series: { showSymbol: boolean; data: DataItem[]; name: string; type: string }[]; tooltip: { formatter: (params: any) => string; axisPointer: { animation: boolean }; trigger: string }; title: { text: string } } = {
    title: {
      text: 'Encoder'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        params = params[0];
        let date = new Date(params.name);
        return (
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear() +
          ' : ' +
          params.value[1]
        );
      },
      axisPointer: {
        animation: false
      }
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
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: data
      }
    ]
  }

  setInterval(function () {
    for (let i = 0; i < 5; i++) {
      data.shift();  // 清除第一条数据
      data.push(randomData());  // 数据最后添加数据
    }

    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          data: data
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