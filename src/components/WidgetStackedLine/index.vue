<template>
  <div class="my_chart" ref="echartsContainer" style="width: 100%; height: 100%"/>
</template>

<script lang="ts" setup>
import {EChartsType} from "echarts";
import {onMounted, ref} from "vue";
import * as echarts from "echarts";
import {get} from "@/net/index.ts"
import {ElMessage} from "element-plus";

interface PropsData {
  url: string
}

interface PropsType {
  data: PropsData
}

let myChart: EChartsType;
const echartsContainer = ref(null)
const props = defineProps<PropsType>()
let nowTimeMock:number;

onMounted(() => {
  myChart = echarts.init(echartsContainer.value);
  myChart.setOption(eChartOption);
  nowTimeMock = new Date().getTime() / 1000;

  setInterval(()=>{
    nowTimeMock += 60;
    const toTime = nowTimeMock;
    const fromTime = toTime - 30 * 60;
    let url = props.data.url + "?startTime=" + fromTime + "&endTime=" + toTime;
    sendReq(url, success, ()=>{});
  }, 2000);
})

/**
 * 请求数据，因为get是异步的，因此不能使用
 * @param url
 * @param success
 * @param failure
 */
function sendReq(url:string, success:Function, failure:Function) {
  get(url, (data) => {
    const dataset = data.data;
    const arrLen = data.data.length - 1;
    let seriesList = [];
    for (let i = 0; i < arrLen; i++) {
      seriesList.push({
        type: "line",
        seriesLayoutBy: "row",
      })
    }
    success(dataset, seriesList);
  }, () => {
    ElMessage.warning("获取数据失败");
  });
}

function success(dataset: [], seriesList: []) {
  myChart.setOption<echarts.EChartsOption>({
    dataset: {
      source: dataset,
    },
    series: seriesList,
  });
}

let eChartOption = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {  // 提示框浮层位置
      return [pt[0], '10%'];
    },
    axisPointer: {
      animation: false  // 是否开启动画
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
    name:"L/min",
    nameTextStyle: {
      // fontSize: 18,
      align:"right",
    },
    type: 'value',
    boundaryGap: [0, '50%'],
    splitLine: {  //  区域中的分隔线。
      show: false
    }
  },
  grid: {
    top:"50px",
    left:"30px",
    right:"0px",
    bottom:"20px"
  },
  legend: {
    type: "plain",
    textStyle: {
      color: "white",
    }
  },
}

</script>

<style lang="scss" scoped>

</style>