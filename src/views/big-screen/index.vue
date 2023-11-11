<template>
  <Dialog
    :before-close="item.closeDialog"
    v-model="item.visible.value"
    :title="item.label"
    v-for="item in DialogModules"
    :key="item.key"
  >
    <BaseStackedLine :data="item.cfg"/>
  </Dialog>
  <BigDisplay>
    <BaseTest>
      <template #left>
        <component
          :is="Widgets[item.key]"
          v-for="item in chunkModules.left"
          :key="item.key"
          :title="item.label"
          @showDialog="ctlDialog"
        />
      </template>
      <template #right>
        <component
          :is="Widgets[item.key]"
          v-for="item in chunkModules.right"
          :key="item.key"
          :title="item.label"
          @showDialog="ctlDialog"
        />
      </template>
      <template #control>
        <WidgetControlPanel></WidgetControlPanel>
      </template>
    </BaseTest>
  </BigDisplay>

</template>

<script lang="ts" setup>
import BigDisplay from "@/components/BaseLayout/BigScreen.vue"
import Widgets from "./widgets"
import WidgetControlPanel from "./widgets/components/ControlPanel.vue"
import BaseTest from "@/components/BaseModel/index.vue"
import {storeToRefs} from 'pinia'
import {useLayoutStore} from '@/store/modules/layout.ts'
import Dialog from "@/components/BaseDialog/index.vue";
import BaseStackedLine from "@/components/BaseStackedLine/index.vue";


const {chunkModules, DialogModules} = storeToRefs(useLayoutStore())

// 子组件事件，触发操作
function ctlDialog(argTitle:string) {
  for (const item of DialogModules.value) {
    if (item.label === argTitle) {
      item.openDialog();
      return;
    }
  }
}


</script>

<style lang="scss" scoped>

</style>