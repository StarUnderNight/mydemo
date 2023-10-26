<template>
  <WidgetPanel title="设备异常监测">
    <BaseTable :columns="columns" :data="dataSource"></BaseTable>
  </WidgetPanel>
</template>
<script setup lang="ts">
import BaseTable from '@/components/BaseTable/index.vue'
import { reactive } from 'vue'
import WidgetPanel from '../WidgetPanel.vue'

const columns = [
  {
    title: '设备名',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '发生时间',
    dataIndex: 'time',
    width: '40%',
  },
  {
    title: '异常',
    dataIndex: 'status',
    width: '35%',
  },
]
const dataSource = reactive([
  {
    name: '激光雷达',
    time: '2023/04/02 19:12',
    status: '无法读取数据',
  },
  {
    name: 'IMU',
    time: '2023/04/03 23:10',
    status: '无法读取数据',
  },
  {
    name: '油温',
    time: '2023/04/04 03:14',
    status: '过高',
  },
  {
    name: '超声波',
    time: '2023/04/05 11:00',
    status: '数据读取异常',
  },
  {
    name: '底盘',
    time: '2023/04/06 14:23',
    status: '速度异常',
  },
  {
    name: '激光雷达',
    time: '2023/04/07 11:02',
    status: '无法读取数据',
  },
  {
    name: '编码器',
    time: '2023/05/03 22:02',
    status: '连接异常',
  },
  {
    name: '凤扇°',
    time: '2023/05/04 12:00',
    status: '连接异常',
  },
  {
    name: '左履带',
    time: '2023/05/05 12:00',
    status: '速度异常',
  },
  {
    name: '压力',
    time: '2023/05/06 12:00',
    status: '总压力过大',
  },
])
</script>
