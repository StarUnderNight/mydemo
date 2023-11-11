<template>
  <el-header>
    <!--图标 -->
    <el-icon @click="isCollapse = !isCollapse">
      <Expand v-show="isCollapse"/>
      <Fold v-show="!isCollapse"/>
    </el-icon>

    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="{path: item.path}"
      > {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 下拉菜单 -->
    <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        :size="30"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户姓名</el-dropdown-item>
          <el-dropdown-item disabled>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </el-header>
</template>

<script lang="ts" setup>
import {Expand, Fold, ArrowDown} from "@element-plus/icons-vue";
import {isCollapse} from "./isCollapse.ts"
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #dedfe0;

  .el-icon {
    margin-left: -10px;
  }

}
.el-dropdown {
  margin-left: auto;
}
</style>