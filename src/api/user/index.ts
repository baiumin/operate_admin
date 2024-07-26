// 统一管理项目用户相关接口
import request from '@/utils/request.ts'
import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type.ts'

// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 暴露请求函数
/*登录接口*/
export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

/*获取用户信息接口*/
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL)

/*退出登录接口*/
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
