<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin-top: 10px">
      <div v-show="scene === 0">
        <el-button
          type="success"
          plain
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="doAddBtn"
        >
          添加属性
        </el-button>
        <el-empty
          description="description"
          v-if="!categoryStore.c3Id"
          :image-size="400"
        />
        <el-table
          style="width: 100%; margin: 10px 0"
          max-height="650"
          border
          stripe
          :data="attrArr"
          v-if="categoryStore.c3Id"
        >
          <el-table-column
            label="序号"
            width="100px"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            align="center"
            width="150px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #default="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
              >
                {{ (item as AttrValue).valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300px">
            <template #default="{ row }">
              <el-button
                type="warning"
                plain
                icon="Edit"
                @click="editAttr(row)"
              >
                修改
              </el-button>
              <el-popconfirm
                :title="`您确认要删除属性'${row.attrName}'?`"
                icon="Delete"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button type="danger" plain icon="Delete">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--添加|修改属性-->
      <el-form v-show="scene" :model="attrParams">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            style="width: 250px"
            v-model="attrParams.attrName"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            plain
            icon="Plus"
            :disabled="!attrParams.attrName"
            @click="addAttrValue"
          >
            添加属性值
          </el-button>
          <el-button @click="scene = 0">取消</el-button>
        </el-form-item>
        <el-form-item>
          <el-table
            style="width: 100%"
            border
            stripen
            :data="attrParams.attrValueList"
          >
            <el-table-column
              label="序号"
              type="index"
              width="100px"
              align="center"
            />
            <el-table-column label="属性值名称">
              <template #default="{ row, $index }">
                <el-input
                  placeholder="请输入属性值名称"
                  v-model="row.valueName"
                  v-if="row.flag"
                  @blur="looseBlur(row, $index)"
                  :ref="(vc: any) => (inputArr[$index] = vc)"
                />
                <div v-else @click="toBlur(row, $index)">
                  {{ (row as AttrValue).valueName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template #default="{ $index }">
                <el-button
                  icon="Delete"
                  type="danger"
                  @click="attrParams.attrValueList.splice($index, 1)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button
            type="primary"
            plain
            @click="save"
            :disabled="attrParams.attrValueList.length <= 0"
          >
            保存
          </el-button>
          <el-button @click="scene = 0">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category.ts'
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr'
import {
  Attr,
  AttrList,
  AttrResponseData,
  AttrValue,
} from '@/api/product/attr/type.ts'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore() //获取商品分类小仓库数据
let attrArr = ref<AttrList>([]) //存储获取的属性与属性值
let scene = ref<number>(0) //0：列表，1：添加|修改页面
let attrParams = reactive<Attr>({
  attrName: '', //新增属性的名字
  attrValueList: [], //新增属性的属性值数组
  categoryId: '', //新增属性所属的三级分类ID
  categoryLevel: 3, //表示三级分类
}) //收集的属性实例
let inputArr = ref<any>([]) //准备一个数组:将来存储对应组件实例el-input

// 点击保存按钮的回调
const save = async () => {
  const result = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    await getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
// 点击添加属性值按钮的回调
const addAttrValue = () => {
  // 向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //添加|修改属性表格输入框编辑|查看模式切换索引
  })
  // 获取最后一个el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
// 点击添加属性按钮的回调
const doAddBtn = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}
// 点击修改属性按钮的回调
const editAttr = (row: Attr) => {
  scene.value = 1
  // 将已有属性值传给attrParams对象
  // Object.assign(attrParams, row) //浅拷贝出现问题
  Object.assign(attrParams, JSON.parse(JSON.stringify(row))) //创建深拷贝赋值
}
// 点击删除按钮的回调
const deleteAttr = async (attrId: number) => {
  const result = await reqRemoveAttr(attrId)
  if (result.code === 200) {
    ElMessage({
      type: 'warning',
      message: '删除属性成功!',
    })
    await getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除属性失败!',
    })
  }
}
// 请求获取已有的属性和属性值方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}
// 输入框失去焦点，编辑|查看模式切换
const looseBlur = (row: AttrValue, $index: number) => {
  // 非法行为1,属性值输入为空
  if (row.valueName.trim() == '') {
    // 删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空！！！',
    })
    return
  }
  // 非法行为2,属性值重复
  let repeat = attrParams.attrValueList.find((item: AttrValue) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复！！！',
    })
    return
  }
  row.flag = false
}
// 查看|编辑输入框模式切换
const toBlur = (row: AttrValue, $index: number) => {
  row.flag = true
  // 响应式数据发生变化，获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
// 监听商品分类小仓库c3Id的变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空数据
    // attrArr.value = []
    // 保证三级分类id存在才发请求
    if (!categoryStore.c3Id) return
    // 获取属性列表
    getAttr()
  },
)
// 路由组件销毁时，把商品分类小仓库相关数据清空
onBeforeUnmount(() => {
  // 清空小仓库数据
  categoryStore.$reset()
})
defineOptions({ name: 'Attr' })
</script>

<style scoped lang="scss"></style>
