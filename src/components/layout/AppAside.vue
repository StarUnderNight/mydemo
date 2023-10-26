<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/mky/logo.png" alt=""/>
          <h1>中煤科工</h1>
        </a>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><HomeFilled/></el-icon> <span>首页</span>
          </template>
          <el-menu-item index="/big-display">
            <span>大屏展示</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><DataLine/></el-icon> <span>数据</span>
          </template>
          <el-menu-item index="/2">
            <span>数据总览</span>
          </el-menu-item>
          <el-menu-item index="/robot-list">
            <span>Robot 列表</span>
          </el-menu-item>
          <el-menu-item index="/data-stream-display">
            <span>数据流量</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><i class="iconfont icon-guzhangjiluchaxun"/> </el-icon> <span>监测</span>
          </template>
          <el-menu-item index="/exception-display">
            <span>异常历史</span>
          </el-menu-item>
          <el-menu-item index="/monitor-flow">
            <span>流量监测</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><Setting/></el-icon> <span>系统管理</span>
          </template>
          <el-menu-item index="/d1">
            <span>用户设置</span>
          </el-menu-item>
          <el-menu-item index="/d2">
            <span>角色设置</span>
          </el-menu-item>
          <el-menu-item index="/d2">
            <span>权限设置</span>
          </el-menu-item>
        </el-sub-menu>

      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import {Setting, HomeFilled, DataLine} from "@element-plus/icons-vue";
import {ref} from "vue"
import "@/assets/iconfont/iconfont.css"
import {isCollapse} from "./isCollapse" // 左侧拖动菜单栏时，是否折叠菜单栏
</script>

<style lang="scss" scoped>

.el-aside {
  background-color: #e9e9eb;
  height: 100vh;
  width: auto;
}
.el-menu {
  background-color: #e9e9eb;
  width: 200px;
  border-right: none;
  &.el-menu--collapse {
    width:60px;
    & h1 {
      display: none;
    }
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  text-decoration: none;
  color: black;
  img {
    width: 80px;
    height: 50px;

  }
}

</style>