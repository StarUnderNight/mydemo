<template>
  <el-space wrap>
    <el-button @click="openDialog1()">表单弹窗（新增）</el-button>
  </el-space>
  <Dialog
    :before-close="customClose"
    @confirm="confirm"
    v-model="visible"
    :title="titleVal"
    :confirm-text="ctxVal"
  >
    <BaseStackedLine :data="propsData"/>
  </Dialog>
</template>
<script setup lang="ts">
import useDialog from "@/components//BaseDialog/useDialog.ts";
import {ElButton, ElMessage} from "element-plus";
import BaseStackedLine from "@/components/BaseStackedLine/index.vue";
import Dialog from "@/components/BaseDialog/index.vue";

let propsData = {
  url: "/api/flow-data"
};
const titleVal = "流量";
const ctxVal = "确认";
const {
  visible: visible,
  openDialog: openDialog,
  closeDialog: closeDialog,
} = useDialog();

const confirm = () => {
  ElMessage({
    message: "你点击了确定按钮",
    type: "success",
  });
  closeDialog();
};
const customClose = () => {
  ElMessage({
    message: "取消提交",
    type: "info",
  });
  closeDialog();
};

const openDialog1 = () => {
  openDialog();
};
</script>

<style lang="less" scoped></style>