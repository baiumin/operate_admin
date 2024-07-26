// 商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { CategoryResponseData } from '@/api/product/attr/type.ts'
import { CategoryState } from '@/store/modules/types/type.ts'

const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [], //存储C1数据
      c1Id: '', //存储C1的id
      c2Arr: [], //存储C2数据
      c2Id: '', //存储C2的id
      c3Arr: [], //存储C3数据
      c3Id: '', //存储C3的id
    }
  },
  actions: {
    // 获取一级分类数据
    async getC1() {
      const result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    // 获取二级分类数据
    async getC2() {
      const result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code) {
        this.c2Arr = result.data
      }
    },
    // 获取三级分类数据
    async getC3() {
      const result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code) {
        this.c3Arr = result.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
