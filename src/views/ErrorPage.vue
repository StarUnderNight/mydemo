<template>
  <div>错误页面</div>
  <div style="width: 800px;height: 500px">
    <BaseStackedLine :data="propsData"/>
  </div>
  <div class="block">
    <span class="demonstration">开始时间</span>
    <el-date-picker
      v-model="startTime"
      type="datetime"
      placeholder="选择日期和时间"
      :shortcuts="shortcuts"
    />
  </div>
  <div class="block">
    <span class="demonstration">结束时间</span>
    <el-date-picker
      v-model="endTime"
      type="datetime"
      placeholder="选择日期和时间"
      :shortcuts="shortcuts"
    />
  </div>
  <el-button @click="requestData">Mock请求</el-button>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue"
import {get} from "@/net";
import {ElMessage} from "element-plus";
import BaseStackedLine from "@/components/BaseStackedLine/index.vue"

let propsData = {
  dataset: [],
  serialList: []
};

const startTime = ref('')
const endTime = ref('')

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

onMounted(() => {
  let curTime = new Date().getTime() / 1000;
  let lastTime = curTime - 5 * 24 * 60 * 60;
  sendReq(lastTime, curTime)
})

function sendReq(fromTime:number, toTime:number) {
  let url = "/api/flow-data?fromTime=" + fromTime + "&toTime=" + toTime;
  get(url, (data) => {
    ElMessage.success("成功获取flow data数据");
    const arrLen = data.data.length - 1;
    let seriesList = []
    for (let i = 0; i < arrLen; i++) {
      seriesList.push({
        type: "line",
        seriesLayoutBy: "row",
      })
    }
    propsData.dataset = data.data;
    propsData.serialList = seriesList
  }, () => {
    ElMessage.warning("失败，没有获取flow data");
  });
}

function requestData() {
  if (startTime.value === '' || endTime.value === '' || startTime.value == null || endTime.value == null) {
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
  sendReq(fromTime, toTime)
}


</script>

<style lang="scss" scoped>

</style>