<template>
  <div class="big-screen">
    <div class="big-screen-header">{{ appName }}</div>
    <div class="big-screen-main">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const appName = '移动平台监测预警系统'
</script>
<style lang="scss" scoped>
.big-screen {
  width: 100vw;
  height: 100vh;
  background-color: #000;

  .big-screen-header {
    position: absolute;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 64px;
    padding-bottom: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    background: url('@/assets/images/header_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 64px;
  }

  .big-screen-main {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #01355059 1px, transparent 1px),
      linear-gradient(0deg, #01355059 1px, transparent 1px);
    background-size: 30px 30px, 30px 30px;
  }
}
</style>
