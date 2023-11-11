<template>
  <!-- 这里的tilte应该会透传到WidgetPanel,在WidgetPanel中该title会和big-screen传递的title合并-->
  <WidgetPanel title="">
    <template #widget>
      <WidgetStackedLine :data="propsData" />
    </template>
  </WidgetPanel>
</template>

<script setup lang="ts">
import WidgetStackedLine from '@/components/WidgetStackedLine/index.vue'
import WidgetPanel from '../WidgetPanel.vue'

let propsData = {
  url: "/api/pollution-degree-data"
};


</script>

<style lang="scss" scoped>

</style>
