// 定义品牌相关数据的ts类型
// 定义请求品牌数据列表接口返回的数据都拥有的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 单个品牌数据的ts类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

// 包含所有品牌数据的ts类型
export type Records = TradeMark[]

// 获取请求品牌数据接口返回的数据ts类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
