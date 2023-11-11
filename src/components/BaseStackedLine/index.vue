<template>
  <div class="detail-panel">
    <el-row >
      <el-col :span="16">
        <div class="my_chart" ref="echartsContainer"/>
      </el-col>
      <el-col :span="6" :offset="1">
        <div class="opt-panel">
          <el-row>
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="选择开始日期及时间"
              :shortcuts="shortcuts"
            />
          </el-row>
          <el-row style="top:10px">
            <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="选择结束日期及时间"
              :shortcuts="shortcuts"
            />
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="14">
              <el-button @click="updateData" style="width:100%">查询</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>


  </div>

</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {EChartsType} from 'echarts';
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import {get} from "@/net/index.ts"

interface PropsData {
  url: string
}

interface PropsType {
  data: PropsData
}

const props = defineProps<PropsType>()  // 父组件传递数据给子组件
const echartsContainer = ref(null)
const startTime = ref('')
const endTime = ref('')
let myChart: EChartsType;  // 需要在一开始加载


function init() {
  myChart = echarts.init(echartsContainer.value);
  myChart.setOption(echartOption)
  let toTime = new Date().getTime() / 1000;
  let fromTime = toTime - 5 * 24 * 60 * 60;
  let url = props.data.url + "?startTime=" + fromTime + "&endTime=" + toTime;
  sendReq(url, success, failure);
}

function success(dataset: [], seriesList: []) {
  myChart.setOption<echarts.EChartsOption>({
    dataset: {
      source: dataset,
    },
    series: seriesList,
  });
}

function failure() {

}

function updateData() {
  if (startTime.value == null || endTime.value == null || startTime.value === '' || endTime.value === '') {
    ElMessage.warning("开始或结束时间为空")
    return
  }

  const fromTime = new Date(startTime.value).getTime() / 1000;
  const toTime = new Date(endTime.value).getTime() / 1000;

  // 限制相差时间不能超过多少2小时
  if (fromTime > toTime - 2 * 60 * 60) {
    ElMessage.warning("开始和结束时间相差时间不能少于2小时");
    return;
  }
  let url = props.data.url + "?startTime=" + fromTime + "&endTime=" + toTime;
  sendReq(url, success, failure);
}

function onResizeUpdateChartSize() {
  const height = document.documentElement.clientHeight * 0.6;
  const width = document.documentElement.clientWidth * 0.5;

  myChart.getDom().style.height = height + "px";
  myChart.getDom().style.width = width + "px";
  myChart.resize();

}

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

onMounted(() => {
  init();
  onResizeUpdateChartSize();
  window.onresize = onResizeUpdateChartSize;
})

let echartOption = {
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
    // name:"L/min",
    nameTextStyle: {
      fontSize: 20,
      align:"right",
    },
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
  grid: {
  },
  legend: {
    type: "plain",
    textStyle: {
      color: "black",
    }
  },
}

const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
];

</script>

<style lang="scss" scoped>

.el-row {
  justify-content: center;
}

.opt-panel {
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  padding: 10px;
}

.detail-panel {
  z-index: 1000;
}

.my_chart {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  border-radius: 5px;
  // 限定高宽
  min-height: 600px;
  min-width: 800px;
}
</style>