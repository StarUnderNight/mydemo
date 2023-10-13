<template>
  <div>
    <el-button @click="userLogout">退出登录</el-button>
  </div>
</template>

<script setup>

import router from "@/router/index.ts";
import {logout} from "@/net/index.ts";

function  userLogout() {
  logout(() => router.push("/"))
}

</script>

<style scoped>

</style>