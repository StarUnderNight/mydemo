<template>
  <el-scrollbar>
    <div style="width: 1000px">
      <el-row>
        <el-col :span="12"><Encoder/></el-col>
        <el-col :span="12"><Speed/></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><LidarThroughout/></el-col>
        <el-col :span="12"><OilTemperature/></el-col>
      </el-row>
    </div>

  </el-scrollbar>
</template>

<script lang="ts" setup>
import Encoder from "./conponents/Encoder.vue"
import Speed from "./conponents/Speed.vue"
import LidarThroughout from "./conponents/LidarThroughput.vue"
import OilTemperature from "./conponents/OilTemperature.vue"

</script>

<style lang="scss" scoped>
.el-row {
  height: 500px;
}
</style>