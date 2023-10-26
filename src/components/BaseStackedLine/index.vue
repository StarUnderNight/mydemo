<template>
  <!-- 高度设置为95%，避免折线x轴超出父元素 -->
  <div class="my_chart" ref="echartsContainer" style="width: 100%; height: 95%"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import {getFullTime} from "@/utils/time_util";

const echartsContainer = ref(null)
interface DataType {
  name: string
  value: []
}
interface PropsType {
  data: DataType[]
}
const props = defineProps<PropsType>()  // 父组件传递数据给子组件
const serialList = []
echarts.util.each(props.data, function(data) {
  serialList.push({
    name: data.name,
    type: "line",
    showSymbol: false,
    data:data.value,
    emphasis: {
      focus: 'series'
    },
    smooth: true,
    lineStyle: 0.5
  })
  console.log("invoke")  // TODO 放入的data.value是响应式变量，所以这个函数只执行了一次
})


const chart = () => {
  const myChart = echarts.init(echartsContainer.value)

  let option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        params = params[0];
        let date = new Date(params.name);
        return (
         getFullTime(date) + " " +  params.value[1]
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
      boundaryGap: [0, '50%'],
      splitLine: {
        show: false
      }
    },
    grid: {
      top:"5px",
      left:"30px",
      right:"0px",
      bottom:"20px"
    },
    legend: {
      type: "plain",
      textStyle: {
        color: "white"
      }
    }
  }
  // 不断更新线条
  setInterval(function () {
    myChart.setOption<echarts.EChartsOption>({
      series: serialList
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