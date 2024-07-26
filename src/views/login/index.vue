<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
        >
          <h1>HELLO</h1>
          <h2>欢迎来到硅谷臻选</h2>
          <div class="login-content">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                type="text"
                placeholder="Please input username"
                prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="Please input password"
                show-password
                prefix-icon="Lock"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-btn"
                type="primary"
                @click="login"
                :loading="isLoading"
              >
                登 录
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Login',
})
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { getTime } from '@/utils/time.ts'

// 数据
let loginForm = reactive({
  username: '',
  password: '',
})
let useStore = useUserStore() // 创建用户小仓库
let $router = useRouter() // 创建路由器
let isLoading = ref(false) // 按钮加载状态
let loginFormRef = ref() // 表单获取数据
let $route = useRoute() // 获取路由对象

/**
 * 自定义校验规则函数
 * rule:校验规则对象
 * value:表单元素文本内容
 * callback:校验放行函数。符合条件放行，不符合注入错误提示信息
 */
/*const validatePass = (rule: any, value: any, callback: any) => {
  if (/^[a-zA-Z].{5,14}$/.test(value)) {
    callback()
  } else {
    callback(new Error('First letter AND Length should be 6 to 15'))
  }
}*/
// 表单校验
const rules = reactive({
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 5, max: 10, message: 'Length should be 5 to 10', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, max: 15, message: 'Length should be 6 to 15', trigger: 'blur' },
    // { trigger: 'blur', validator: validatePass },
  ],
})

/**
 * 登录
 * 通知仓库发送登录请求
 * 请求成功->首页
 * 请求失败->弹出登录失败信息
 */
const login = async () => {
  // console.log('输入登录信息：', loginForm)
  // 表单校验，返回校验成功的promise才可继续进行登录请求
  await loginFormRef.value.validate()
  isLoading.value = true
  useStore
    .userLogin(loginForm)
    .then(() => {
      // 判断登录时，路由路径中是否带有query参数，如果有就往query参数跳转，没有就跳转到首页
      let redirect: any = $route.query.redirect
      $router.push({ path: redirect || '/' })
      ElNotification({
        type: 'success',
        message: '欢迎回来',
        title: `HI,${getTime()}好!`,
      })
      isLoading.value = false
    })
    .catch((err) => {
      ElNotification({
        type: 'error',
        message: err.message,
      })
      isLoading.value = false
    })
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login-form {
    position: relative;
    width: 75%;
    top: 35vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 30px 20px 10px 20px;
    box-shadow: 0 0 30px #4569ca;

    h1 {
      font-size: 40px;
      color: white;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 25px 0;
    }

    .login-content {
      padding: 0 60px;

      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
