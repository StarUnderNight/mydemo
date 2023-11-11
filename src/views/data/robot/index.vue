<template>
  <div>
    header
  </div>
  <div>
    <el-table :data="devData()" height="500" stripe style="width: 100%">
      <el-table-column label="序号" prop="serialCode"></el-table-column>
      <el-table-column label="ID" prop="devId"></el-table-column>
      <el-table-column label="名称" prop="devName"></el-table-column>
      <el-table-column label="类型" prop="devType"></el-table-column>
      <el-table-column label="位置" prop="location"></el-table-column>
      <el-table-column label="上次离线时间" prop="devUpdateTime"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <i v-if="scope.row.devState==='1'" class="iconfont icon-zaixianzhuangtai" style="color: greenyellow"/>
          <i v-else class="iconfont icon-zaixianzhuangtai" style="color: rgb(128,128,128)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="paginationClass">
      <el-pagination
        :background="false"
        :disabled="false"
        layout="sizes, prev, pager, next"
        :total="tableState.total"
        :page-size="tableState.limit"
        :page-sizes="[5, 10, 20, 50]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
  </div>

</template>

<script lang="ts" setup>
import {defineComponent,reactive, ref, toRefs} from "vue"
import "@/assets/iconfont/iconfont.css"


/**
 * mock数据
 */
const dataMockNum = 100;
const mockData = reactive([])

for (let i = 1; i < dataMockNum; i++) {
  mockData.push({serialCode: i, devName: "robot1", devType: "digging", location:"重庆", devId: "17556323234", devState: "1", devUpdateTime: "2023.03.23"})
}



const tableState = reactive({
  page: 1,
  limit: 10,
  total: mockData.length,
})

const devData = () => {
  return mockData.filter((item, index) => index < tableState.page * tableState.limit && index >= tableState.limit * (tableState.page - 1))
}

const handleCurrentChange = (e) => {
  tableState.page = e
}
const handleSizeChange = (e) => {
  tableState.limit = e;
}



</script>

<style lang="scss" scoped>
.paginationClass {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;
}
</style>