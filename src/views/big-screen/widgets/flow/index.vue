<template>
  <WidgetPanel title="流量监测">
<!--    <BaseStackedLine :data="allData" />-->
  </WidgetPanel>
</template>
<script setup lang="ts">
import BaseStackedLine from '@/components/BaseStackedline/index.vue'
import WidgetPanel from '../WidgetPanel.vue'

// ##### Mock Data ###

let dataName = ["流量1", "流量2", "流量3", "流量4"]
let allData = []   // 存放多个数据
const oneDay = 24 * 3600 * 1000;
const oneMinute = 60 * 1000
const oneHour = 3600 * 1000

let initNow = new Date(1997, 9, 3);
let loopNow = new Date(+ initNow + oneHour * 51)

let value = Math.random() * 1000;

for (let i = 0; i < dataName.length; i++) {
  let dataArr = [];
  let loopNow = initNow
  for (let j = 0; j < 50; j++) {
    loopNow  = new Date(+ loopNow + oneHour)
    dataArr.push(randomData(loopNow));
  }
  allData.push({
    name: dataName[i],
    value: dataArr
  })
}

function randomData(curNow:Date) {
  value = Math.random() * 100;
  return {
    name: curNow.toString(),
    value:[
    [curNow.getFullYear(), curNow.getMonth() + 1, curNow.getDate()].join('/') + " " +
    [curNow.getHours(), curNow.getMinutes(), curNow.getSeconds()].join(":"), Math.round(value)
  ]}
}

setInterval(function () {
  for (let i = 0; i < dataName.length; i++) {
    let cur = loopNow
    allData[i].value.shift()  // 清除第一条数据
    allData[i].value.push(randomData(cur))  // 数据最后添加数据
  }
  loopNow = new Date(+ loopNow + oneHour)
}, 1000);

</script>
