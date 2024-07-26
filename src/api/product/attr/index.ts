// 属性管理模块接口
import request from '@/utils/request.ts'
import {
  Attr,
  AttrResponseData,
  CategoryResponseData,
} from '@/api/product/attr/type.ts'

// 属性管理模块接口地址
enum API {
  C1_URL = '/admin/product/getCategory1', //一级分类接口地址
  C2_URL = '/admin/product/getCategory2/', //二级分类接口地址
  C3_URL = '/admin/product/getCategory3/', //三级分类接口地址
  ATTR_URL = '/admin/product/attrInfoList/', //获取分类下已有的属性与属性值接口地址
  ADDATTR_URL = '/admin/product/saveAttrInfo', //添加|修改属性接口地址
  REMOVEATTR_URL = '/admin/product/deleteAttr/', //删除属性接口地址
}

/**
 * 获取一级分类的接口方法
 */
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
/**
 * 获取二级分类的接口方法
 * @param category1Id
 */
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
/**
 * 获取三级分类的接口方法
 * @param category2Id
 */
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)

/**
 * 获取属性与属性值的接口方法
 * @param category1Id
 * @param category2Id
 * @param category3Id
 */
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )

/**
 * 添加|修改属性与属性值的接口方法
 * @param data
 */
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDATTR_URL, data)

/**
 * 删除属性的接口方法
 * @param attrId
 */
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.REMOVEATTR_URL + attrId)
