// 品牌管理模块接口
import request from '@/utils/request.ts'
import type {
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type.ts'

// 品牌管理模块接口地址
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/', // 获取品牌数据列表接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save', // 添加品牌接口
  UPDATERADEMARK_URL = '/admin/product/baseTrademark/update', // 修改品牌接口
  REMOVETRADEMARK_URL = '/admin/product/baseTrademark/remove/', // 删除品牌接口z
}

/**
 * 获取品牌数据列表的接口方法
 * @param page 获取第几页，默认第一页
 * @param limit 获取几个品牌数据
 */
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

/**
 * 添加与修改品牌的接口方法
 * @param data
 */
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  // 传入的数据中存在id，则该数据存在，即为修改品牌
  if (data.id) {
    return request.put<any, any>(API.UPDATERADEMARK_URL, data)
  } else {
    // 添加品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

/**
 * 删除品牌数据的接口方法
 * @param id
 */
export const reqRemoveTrademark = (id: number) =>
  request.delete<any, any>(API.REMOVETRADEMARK_URL + id)
