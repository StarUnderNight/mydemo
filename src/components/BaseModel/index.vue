<template>
  <div class="base-model">
    <div class="base-model-left">
      <div class="map-panels">
        <slot name="left"> </slot>
      </div>
      <div class="map-controls">
        <slot name="control"> </slot>
      </div>
    </div>
    <div class="base-model-right">
      <div class="map-panels">
        <slot name="right"></slot>
      </div>
    </div>
    <div id="scene-container" class="loading">
      <!-- Our <canvas> will be inserted here -->
    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted} from "vue";
import {World} from "@/components/ThreeJS/World.ts";



onMounted(()=>{
  main().catch((err)=> {
    console.log(err)
  })
})

async function main() {
  const container = document.querySelector('#scene-container');

  let world = new World(container);

  await world.init()
  world.start()  // 启动动画循环
}


</script>

<style lang="scss" scoped>
.base-model {
  width: 100%;
  height: 100%;

  .base-model-left,
  .base-model-right {
    position: absolute;
    top: 70px;
    z-index: 999;
    display: flex;
    grid-gap: 10px;
    height: calc(100% - 90px);
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    &.base-model-left {
      left: 10px;
    }

    &.base-model-right {
      right: 10px;
    }

    .map-panels {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      grid-gap: 10px;
      height: 100%;
      overflow: hidden;
    }
  }

  .map-controls {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
    color: #fff;

    .icon {
      margin-bottom: 10px;
      font-size: 26px;
    }
  }
}
</style>