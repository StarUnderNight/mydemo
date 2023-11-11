<template>
  <div>
    <BaseStackedLine :data="propsData"/>
  </div>
</template>

<script lang="ts" setup>
import BaseStackedLine from "@/components/BaseStackedLine/index.vue"

let propsData = {
  url: "/api/flow-data"
};

</script>

<style lang="scss" scoped>

</style>