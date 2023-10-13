<template>
  <div>
    header
  </div>
  <div>
    <el-table :data="devData" height="300" stripe style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" prop="serialCode"></el-table-column>
      <el-table-column label="ID" prop="devId"></el-table-column>
      <el-table-column label="设备名" prop="devName"></el-table-column>
      <el-table-column label="类型" prop="devType"></el-table-column>
      <el-table-column label="位置" prop="location"></el-table-column>
      <el-table-column label="上次离线时间" prop="devUpdateTime"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <i v-if="scope.row.devState==='1'" class="iconfont icon-zaixianzhuangtai" style="color: greenyellow"/>
          <i v-else class="iconfont icon-zaixianzhuangtai" style="color: gray"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div>
      <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>

</template>

<script lang="ts" setup>
import {ref} from "vue"
import "@/assets/iconfont/iconfont.css"

const devData = ref([
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
  {serialCode: "1", devName: "dev", devType: "xxx", location:"重庆", devId: "hello", devState: "1", devUpdateTime: "2023.03.23"},
])


</script>

<style lang="scss" scoped>

</style>