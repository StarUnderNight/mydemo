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
import Encoder from "./src/Encoder.vue"
import Speed from "./src/Speed.vue"
import LidarThroughout from "./src/LidarThroughput.vue"
import OilTemperature from "./src/OilTemperature.vue"

</script>

<style lang="scss" scoped>
.el-row {
  height: 500px;
}
</style>