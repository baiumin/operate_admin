<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          style="width: 240px"
          v-model="categoryStore.c1Id"
          @change="c1Change"
          :disabled="scene !== 0"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          style="width: 240px"
          v-model="categoryStore.c2Id"
          @change="c2Change"
          :disabled="scene !== 0"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          style="width: 240px"
          v-model="categoryStore.c3Id"
          :disabled="scene !== 0"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category.ts'
import { onMounted } from 'vue'

let categoryStore = useCategoryStore() //获取商品分类小仓库数据
defineProps(['scene'])
// c2选择器change事件的回调
const c2Change = () => {
  // 需要将c3数据清空
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  // 通知仓库请求获取三级分类数据
  categoryStore.getC3()
}
// c1选择器change事件的回调
const c1Change = () => {
  // 需要将c2c3的数据清空
  categoryStore.c2Id = ''
  categoryStore.c2Arr = []
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  // 通知仓库请求获取二级分类数据
  categoryStore.getC2()
}
// 组件挂载完毕
onMounted(() => {
  getC1()
})
// 通知仓库请求获取一级分类数据
const getC1 = () => {
  categoryStore.getC1()
}
defineOptions({ name: 'Category' })
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
</style>
