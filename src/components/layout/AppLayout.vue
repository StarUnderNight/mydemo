<template>
  <div class="common-layout">
    <el-container>
      <AppAside/>
      <el-container class="header-and-body">
        <AppHeader/>
        <el-main>
          <el-scrollbar>
            <RouterView/>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AppAside from "./AppAside.vue"
import AppHeader from "./AppHeader.vue"
</script>

<style lang="scss" scoped>
.header-and-body {
  flex-direction: column;
  height: 100vh;
}
.el-main {
  background-color: #ffffff;
  padding-right: 0; /**去除el-main默认的padding**/
}

</style>