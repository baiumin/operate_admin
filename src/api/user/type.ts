// 定义用户相关数据的ts类型
// 登录接口需要携带的参数的ts类型
export interface LoginFormData {
  username: string
  password: string
}

// 定义所有接口返回数据都拥有的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 定义登录接口返回的数据类型
export interface LoginResponseData extends ResponseData {
  data: string
}

// 定义获取用户信息返回的数据类型
export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
