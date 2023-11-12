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
      <el-icon
          class="big-screen-setting"
          @click="settingDrawer = true"
      ><Setting /></el-icon>

  <!-- 抽屉式 设置 -->
  <el-drawer v-model="settingDrawer" :direction="direction" size="20%">
    <template #header>
      <h2>设置</h2>
    </template>
    <template #default>
      <div>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>

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
import {onMounted, ref} from "vue";
import {ElMessageBox} from "element-plus";
import {Setting} from "@element-plus/icons-vue";

const {chunkModules, DialogModules} = storeToRefs(useLayoutStore())

const settingDrawer = ref(false)
const direction = ref('rtl')

function cancelClick() {
  settingDrawer.value = false
}
function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose?`)
      .then(() => {
        settingDrawer.value = false
      })
      .catch(() => {
        // catch error
      })
}

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

.big-screen-setting {
  z-index: 1000;
  position: absolute;
  top: 5px;
  right:10px;
  color: white;
  font-size: 30px;
}

.big-screen-setting:hover {
  color: #0bfbff;
  cursor: pointer;
}


</style>