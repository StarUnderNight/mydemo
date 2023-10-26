<template>
  <Collapse
    class="base-collapse"
    expand-icon-position="right"
    :default-active-key="[1]"
    style="user-select: none"
    @mousedown.stop="() => {}"
    @mouseup.stop="() => {}"
    @wheel.stop="() => {}"
    @dblclick.stop="() => {}"
    @click.stop="() => {}"
    @mouseenter.stop="() => {}"
    @mouseleave.stop="() => {}"
  >
    <CollapseItem :key="1">
      <template #header>
        <component :is="icon" v-if="icon" />
        <span style="margin-left: 6px"> {{ title }}</span>
      </template>
      <div class="container">
        <slot />
      </div>
    </CollapseItem>
  </Collapse>
</template>
<script setup lang="ts">
// 看能否替換成element-plus
import { Collapse, CollapseItem } from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.less'

interface PropsType {
  title: string
  icon?: any
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-collapse {
  width: 140px;
  border: unset;
  border-radius: 0;

  :deep(.arco-collapse-item) {
    .arco-collapse-item-header {
      color: #fff;
      background: linear-gradient(to right, #03101d, #0236);
      border: unset;
    }

    .arco-collapse-item-content {
      padding: 0;
      background-color: #0236;

      .arco-collapse-item-content-box {
        padding: 0;
      }
    }
  }

  .container {
    padding: 5px 10px;
    cursor: default;
  }
}
</style>
