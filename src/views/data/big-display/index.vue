<template>
  <BigDisplay>
<!--    <BaseTurbine>-->
<!--      <template #left>-->
<!--        <component-->
<!--          :is="Widgets[item]"-->
<!--          v-for="item in chunkModules.left"-->
<!--          :key="item"-->
<!--        />-->
<!--      </template>-->
<!--      <template #right>-->
<!--        <component-->
<!--          :is="Widgets[item]"-->
<!--          v-for="item in chunkModules.right"-->
<!--          :key="item"-->
<!--        />-->
<!--      </template>-->
<!--      <template #control>-->
<!--        <WidgetControlPanel></WidgetControlPanel>-->
<!--        <WidgetControlTurbine></WidgetControlTurbine>-->
<!--      </template>-->
<!--    </BaseTurbine>-->
    <BaseTest/>
  </BigDisplay>
</template>

<script lang="ts" setup>
import BigDisplay from "@/components/layout/BigDisplay.vue"
import BaseTurbine from "@/components/BaseModel/index.vue"
import Widgets from "./widgets"
import WidgetControlPanel from "./widgets/control-panel/index.vue"
import WidgetControlTurbine from "./widgets/control-model/index.vue"
import BaseTest from "@/components/BaseTest/index.vue"
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/store/modules/layout'
const { chunkModules } = storeToRefs(useLayoutStore())

</script>

<style lang="scss" scoped>

</style>