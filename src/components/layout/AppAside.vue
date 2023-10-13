<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/vue.svg" alt=""/>
          <h1>监控</h1>
        </a>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Setting/></el-icon> <span>首页</span>
          </template>
          <el-menu-item index="/a1">
            <el-icon><Setting/></el-icon> <span>子菜单1</span>
          </el-menu-item>
          <el-menu-item index="/a2">
            <el-icon><Setting/></el-icon> <span>子菜单2</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><Setting/></el-icon> <span>数据显示</span>
          </template>
          <el-menu-item index="/b1">
            <el-icon><Setting/></el-icon> <span>总览</span>
          </el-menu-item>
          <el-menu-item index="/dev-list">
            <el-icon><Setting/></el-icon> <span>设备列表</span>
          </el-menu-item>
          <el-menu-item index="/b2">
            <el-icon><Setting/></el-icon> <span>详情展示</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><Setting/></el-icon> <span>监测</span>
          </template>
          <el-menu-item index="/c1">
            <el-icon><Setting/></el-icon> <span>子菜单1</span>
          </el-menu-item>
          <el-menu-item index="/c2">
            <el-icon><Setting/></el-icon> <span>子菜单2</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><Setting/></el-icon> <span>系统管理</span>
          </template>
          <el-menu-item index="/d1">
            <el-icon><Setting/></el-icon> <span>子菜单1</span>
          </el-menu-item>
          <el-menu-item index="/d2">
            <el-icon><Setting/></el-icon> <span>子菜单2</span>
          </el-menu-item>
        </el-sub-menu>

      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import {Setting} from "@element-plus/icons-vue";
import {ref} from "vue"
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
    width: 32px;
    height: 32px;

  }
}

</style>