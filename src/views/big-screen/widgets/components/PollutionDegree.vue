<template>
  <!-- 这里的tilte应该会透传到WidgetPanel,在WidgetPanel中该title会和big-screen传递的title合并-->
  <WidgetPanel title="">
    <template #widget>
      <div class="pollution-degree-panel">
        <el-row  justify="space-around">
          <el-col :span="7"><div class="level-title" style="background-color: #79BBFF">Level-4</div></el-col>
          <el-col :span="7"><div class="level-title" style="background-color: #b3e19d">Level-6</div></el-col>
          <el-col :span="7"><div class="level-title" style="background-color: #eebe77">Level-14</div></el-col>
        </el-row>
        <el-row justify="space-around">
          <el-col :span="7" class="level-icon" style="color: #c6e2ff"><el-icon><Bottom/></el-icon></el-col>
          <el-col :span="7" class="level-icon" style="color: #d1edc4"><el-icon><Bottom/></el-icon></el-col>
          <el-col :span="7" class="level-icon" style="color: #f8e3c5"><el-icon><Bottom/></el-icon></el-col>
        </el-row>
        <el-row justify="space-around">
          <el-col :span="7"><div class="level-val" style="background-color: #409EFF">{{level_4}}</div></el-col>
          <el-col :span="7"><div class="level-val" style="background-color: #67C23A">{{level_6}}</div></el-col>
          <el-col :span="7"><div class="level-val" style="background-color: #E6A23C">{{level_14}}</div></el-col>
        </el-row>
      </div>
    </template>
  </WidgetPanel>
</template>

<script setup lang="ts">
import WidgetPanel from '../WidgetPanel.vue'
import {onMounted, ref} from "vue"
import {Bottom} from "@element-plus/icons-vue";
import {get} from "@/net";
import {ElMessage} from "element-plus";


const level_4 = ref('0');
const level_6 = ref('0');
const level_14 = ref('0');

onMounted(() => {
  let nowTimeMock = new Date().getTime() / 1000;
  setInterval(()=>{
    nowTimeMock += 60;
    const toTime = nowTimeMock;
    const fromTime = toTime - 10 * 60;  // 取当前时间到10分钟前的数据
    const url = "/api/pollution-degree-data?startTime=" + fromTime + "&endTime=" + toTime;
    sendReq(url, success, ()=>{});
  }, 2000);
})

function success() {

}

function sendReq(url:string, success:Function, failure:Function) {
  get(url, (data) => {
    const dataset = data.data;
    const val:string = dataset[1].pop();  // 取最新的值
    const arr:Array<string> = val.split("-");

    level_4.value = arr[0];
    level_6.value = arr[1];
    level_14.value = arr[2];
  }, () => {
    ElMessage.warning("获取数据失败");
  });
}


</script>

<style lang="scss" scoped>

.pollution-degree-panel {
  margin-top: 5%;
  height: 80%;
  justify-content: center;
  justify-items: center;
  padding: 5px;
}

.level-title {
  color: black;
  font-size: 20px;
  border-radius: 50px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 0 5px 0 white;
}
.level-icon {
  text-align: center;
  font-size: 25px;
  padding: 10px;
}
.level-val {
  background-color: yellow;
  text-align: center;
  padding: 10px;
  font-size: 30px;
  color: white;
}


</style>
