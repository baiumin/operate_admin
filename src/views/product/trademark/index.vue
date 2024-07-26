<template>
  <div>
    <el-card>
      <el-button type="success" plain icon="Plus" @click="addTradeMark">
        添加品牌
      </el-button>
      <el-table
        :data="trademarkArr"
        style="width: 100%; margin: 15px 0"
        border
        stripe
        max-height="700px"
      >
        <el-table-column
          label="序号"
          width="100px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="品牌名称"
          align="center"
          prop="tmName"
        ></el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #default="{ row }">
            <img
              :src="row.logoUrl"
              onerror="this.src='https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'"
              style="width: 80px; height: 80px"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center" width="300px">
          <template #default="{ row }">
            <el-button
              type="warning"
              plain
              icon="Edit"
              @click="editTradeMark(row)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`您确认要删除品牌'${row.tmName}'?`"
              icon="Delete"
              @confirm="deleteTradeMark(row.id)"
            >
              <template #reference>
                <el-button type="danger" plain icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[6, 8, 10, 15]"
        :small="true"
        :background="true"
        layout=" prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="getHasTrademark"
        @current-change="getHasTrademark"
      />
    </el-card>
    <!--对话框组件：添加品牌|修改品牌-->
    <el-dialog
      v-model="dialogVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      width="35%"
      draggable
    >
      <el-form
        label-width="100px"
        style="width: 90%; margin: 10px 0"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
              alt=""
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateTrademark,
  reqHasTrademark,
  reqRemoveTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type.ts'
import { ElMessage, UploadProps } from 'element-plus'

let pageNo = ref<number>(1) //当前页码
let pageSize = ref<number>(6) //一页显示数据条数
let total = ref<number>(0) //数据总数
let trademarkArr = ref<Records>([]) //品牌数据列表
let dialogVisible = ref(false) //对话框显示|隐藏
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
}) //收集品牌表单数据
let formRef = ref() //获取表单组件实例

// 对话框确定按钮的回调：添加|修改品牌事件
const confirm = async () => {
  // 表单校验，返回成功promise才可放行
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    dialogVisible.value = false //关闭对话框
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    // await getHasTrademark(trademarkParams.id ? pageNo.value : 1) //控制刷新数据回到第一页
    await getHasTrademark()
  } else {
    dialogVisible.value = false //关闭对话框
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}
// 气泡框点击确认按钮的回调：删除品牌事件
const deleteTradeMark = async (id: number) => {
  let result = await reqRemoveTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'warning',
      message: '删除品牌成功',
    })
    await getHasTrademark()
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
/**
 * 获取品牌数据方法
 * 调用获取品牌数据的接口,reqHasTrademark(page, limit)
 * page 获取第几页，默认第一页
 * limit 获取几个品牌数据
 */
const getHasTrademark = async () => {
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    pageSize.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 添加品牌按钮的回调
const addTradeMark = () => {
  dialogVisible.value = true
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 清除之前产生的表单校验提示
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
// 修改品牌按钮的回调
const editTradeMark = (row: TradeMark) => {
  dialogVisible.value = true
  Object.assign(trademarkParams, row)
  // 清除之前产生的表单校验提示
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
// 上传图片 --> 上传图片成功触发的钩子函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // response:上传图片post请求服务器返回的数据
  trademarkParams.logoUrl = response.data
  // 上传成功，清除图片的校验结果
  formRef.value.clearValidate('logoUrl')
}
// 上传图片 --> 上传图片前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 钩子是在图片上传成功之前触发，上传文件之前可以约束文件类型与大小
  // 要求：上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小必须小于4M ',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式必须为 PNG | JPG | GIF ',
    })
    return false
  }
}
// 表单校验规则对象
const rules = {
  tmName: [
    { required: true, message: '请输入品牌名称', trigger: 'blur' },
    { min: 2, message: '品牌名称长度要大于2位', trigger: 'blur' },
  ],
  logoUrl: [{ required: true, message: '请上传品牌LOGO' }],
}
// 组件挂载完毕钩子 --- 发一次请求，获取品牌数据
onMounted(() => {
  getHasTrademark()
})
defineOptions({ name: 'Trademark' })
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
