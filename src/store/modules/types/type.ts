// 定义小仓库数据state的ts类型
import { RouteRecordRaw } from 'vue-router'
import { CategoryObj } from '@/api/product/attr/type.ts'

// 定义用户小仓库数据state的ts类型
export interface userState {
  token: string | null
  username: string
  avatar: string | null
  menuRoutes: RouteRecordRaw[]
}

// 定义商品分类小仓库数据state的ts类型
export interface CategoryState {
  c1Arr: CategoryObj[]
  c1Id: number | string
  c2Arr: CategoryObj[]
  c2Id: number | string
  c3Arr: CategoryObj[]
  c3Id: number | string
}

export interface SettingState {
  isFold: boolean
  refresh: boolean
}
