
<template>
  <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
    <div style="flex:1;background-color: black">
      <el-image style="width: 100%;height: 100%" fit="cover"
          src="http://pic.bizhi360.com/bbpic/48/8548.jpg"></el-image>
    </div>
    <div class="welcome-title">
      <div style="font-size: 40px;font-weight: bold">移动平台监测预警系统</div>
      <div style="margin-top: 10px">MPMAWS系统采用B/S架构，运行于数据中心上</div>
      <div style="">它提供接口供各类移动平台，如消防机器人、钻孔机器人、喷浆机器人等上传监测信息</div>
    </div>
    <div class="right-card">
      <router-view v-slot="{Component}" >
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.right-card {
  width: 400px;
  z-index: 1;
  background-color: white;
}

.welcome-title {
  position: absolute;
  bottom: 30px;
  left: 30px;
  text-shadow: 0 1px 1px black;
}

</style>