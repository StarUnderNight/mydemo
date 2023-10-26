<template>
  <div class="big-display">
    <div class="big-display-header">{{ appName }}</div>
    <div class="big-display-main">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const appName = '模型'
</script>
<style lang="scss" scoped>
.big-display {
  width: 100vw;
  height: 100vh;
  background-color: #000;

  .big-display-header {
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

  .big-display-main {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #01355059 1px, transparent 1px),
      linear-gradient(0deg, #01355059 1px, transparent 1px);
    background-size: 30px 30px, 30px 30px;
  }
}
</style>
