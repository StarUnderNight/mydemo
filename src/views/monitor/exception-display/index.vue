<template>
  <div class="header">
  </div>
  <el-row>
    <el-col :span="20">
      <div class="msgDisplay">
        <el-scrollbar ref="scrollbarRef" max-height="500px" always >
          <div ref="innerRef">
            <div v-for="item in mockData" class="scrollbar-demo-item">
              <el-row style="font-size: large">
                <el-col :span="2"><span>ID</span></el-col>
                <el-col :span="4"><span>机器人名称</span></el-col>
                <el-col :span="6"><span>异常内容</span></el-col>
                <el-col :span="12"><span>发生时间</span></el-col>
              </el-row>
              <el-row style="margin-top: 15px;color: black">
                <el-col :span="2"><span>{{item.devID}}</span></el-col>
                <el-col :span="4"><span>{{item.devName}}</span></el-col>
                <el-col :span="6"><span>{{item.description}}</span></el-col>
                <el-col :span="12"><span>{{item.occurTime}}</span></el-col>
              </el-row>
              <el-row style="margin-top: 22px; font-size: 12px; color: gray">
                <el-col :span="4" :offset="20">
                  <span>{{item.curTime}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import {dayjs} from "element-plus";
import {get} from "@/net";
import axios from "axios";


const mockData = ref([])
const scrollbarRef = ref() // 滚动条实例
const innerRef = ref() // 计数器内部实例


/**
 * 控制滚动条滚动到容器的底部
 */
async function setScrollToBottom() {
  // 注意：需要通过 nextTick 以等待 DOM 更新完成
  await nextTick()
  const max = innerRef.value!.clientHeight
  scrollbarRef.value!.setScrollTop(max)
}

// 先使用get方法获取数据
function getData() {
  get("/api/test2", (data) => {
    console.log("数据")
    console.log(data)
  }, (data) => {
    console.log("错误")
    console.log(data)
  })
}
getData()
axios.get("/api/test2").then(({data}) => {
  if (data.code === 200) {
    console.log(data)
  } else {

  }
})

// **** websocket通信
let socket
async function openSocket() {
  if(typeof(WebSocket) == "undefined") {
    console.log("您的浏览器不支持WebSocket");
  }else{
    console.log("您的浏览器支持WebSocket");
    let socketUrl="ws://localhost:8080/api/websocket/100";

    console.log(socketUrl);
    if(socket != null){
      socket.close();
      socket = null;
    }
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function() {
      console.log("websocket已打开");
    };
    //获得消息事件
    socket.onmessage = async function(msg) {
      let backMockData = JSON.parse(msg.data)
      mockData.value.push({
        level: backMockData.level,
        devName: backMockData.robotName,
        description: backMockData.description,
        devID: backMockData.id,
        occurTime: backMockData.occurTime,
        curTime: dayjs().format("MM-DD HH:mm:ss")
      })
      await setScrollToBottom()
      //发现消息进入    开始处理前端触发逻辑
    };
    //关闭事件
    socket.onclose = function() {
      console.log("websocket已关闭");
    };
    //发生了错误事件
    socket.onerror = function() {
      console.log("websocket发生了错误");
    }
  }
}

// TODO 窗口关闭时，需要主动去关闭websocket连接
// openSocket()

</script>

<style scoped>
.header {
  margin: 10px;
}
.scrollbar-demo-item {
  /*display: flex;*/
  align-items: center;
  justify-content: center;
  height: 100px;
  margin: 20px;
  text-align: center;
  padding-top:10px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.msgDisplay {
  height: 100%;
}



</style>
