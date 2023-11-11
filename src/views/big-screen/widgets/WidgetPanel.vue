<template>
  <div
    class="widget-panel animate animate__bounceIn"
    @mousedown.stop="() => {}"
    @mouseup.stop="() => {}"
    @wheel.stop="() => {}"
    @dblclick.stop="() => {}"
    @click.stop="() => {}"
    @mouseenter.stop="() => {}"
    @mouseleave.stop="() => {}"
    @click="$emit('showDialog', title)"
  >
    <!--title表示给父组件传递的参数，相当于在这里调用父组件的函数 -->

    <el-tooltip
      class="box-item"
      effect="light"
      content="点击查看详细内容"
      placement="top-start"
    >
      <div class="widget-panel-title">{{ title }}</div>
    </el-tooltip>

    <div class="widget-panel-main">
      <slot name="widget"></slot>
    </div>
  </div>

</template>

<script setup lang="ts">

interface PropsType {
  title: string
}
defineProps<PropsType>()

</script>

<style lang="scss" scoped>
$beam-color: #99fffe;

.widget-panel {
  position: relative;
  box-sizing: border-box;
  width: 370px;
  height: 100%;
  padding: 5px 5px;
  overflow: auto;
  background: linear-gradient($beam-color, $beam-color) left -3px top 0,
    linear-gradient($beam-color, $beam-color) left -3px top -3px,
    linear-gradient($beam-color, $beam-color) right -3px top 0,
    linear-gradient($beam-color, $beam-color) right -3px top -3px,
    linear-gradient($beam-color, $beam-color) left -3px bottom 0,
    linear-gradient($beam-color, $beam-color) left -3px bottom -3px,
    linear-gradient($beam-color, $beam-color) right -3px bottom 0,
    linear-gradient($beam-color, $beam-color) right -3px bottom -3px;
  background-color: $dashborad-panel-bg;
  background-repeat: no-repeat;
  background-size: 3px 16px, 16px 3px;
  backdrop-filter: blur(1px);
  border: 1px solid transparent;

  .widget-panel-title {
    height: 30px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }

  .detail-panel {
    //display: none;
    float: left;
    margin-left:  -100px;
    width: 500px;
    height: 500px;

  }

  .widget-panel-main {
    height: calc(100% - 35px);
    overflow: hidden;
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

::-webkit-scrollbar-thumb {
  background-color: #cfcdc8;
  border-radius: 100px;
}
</style>
