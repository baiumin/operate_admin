// 定义属性模块相关数据的ts类型
// 定义请求接口返回的数据都拥有的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/*获取商品分类接口返回数据的ts类型*/

// 单个分类数据的ts类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

// 相应的分类接口返回数据的ts类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

/*获取属性与属性值接口返回数据的ts类型*/

// 属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

// 存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]

// 属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}

// 存储每一个属性对象的数组的ts类型
export type AttrList = Attr[]

// 属性接口返回的数据的ts类型
export interface AttrResponseData extends ResponseData {
  data: AttrList
}
