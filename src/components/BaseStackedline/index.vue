<template>
  <!-- 高度设置为95%，避免折线x轴超出父元素 -->
  <div class="my_chart" ref="echartsContainer" style="width: 100%; height: 95%"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import {getFullTime} from "@/utils/time_util.ts";

const echartsContainer = ref(null)
interface PropsData {
  dataset: any[]
  serialList: any[]
}

interface PropsType {
  data:PropsData
}
const props = defineProps<PropsType>()  // 父组件传递数据给子组件

const chart = () => {
  const myChart = echarts.init(echartsContainer.value)

  let option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {  // 提示框浮层位置
        return [pt[0], '10%'];
      },
      axisPointer: {
        animation: false  // 是否开启动画
      }
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},  // 配置项还原
        saveAsImage: {}  // 保存为图片
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,  // 坐标轴两边留白策略
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '50%'],
      splitLine: {  //  区域中的分隔线。
        show: false
      }
    },
    dataZoom: [  // 用于区间缩放
      {
        type: 'inside',
        start: 90,
        end: 100
      },
      {
        start: 90,
        end: 100
      }
    ],
    // grid: {
    //   top:"5px",
    //   left:"30px",
    //   right:"0px",
    //   bottom:"20px"
    // },
    legend: {
      type: "plain",
      textStyle: {
        color: "black",
      }
    },
  }
  // 不断更新线条
  setInterval(function () {
    myChart.setOption<echarts.EChartsOption>({
      dataset: {
        source: props.data.dataset,
      },
      series:props.data.serialList,
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