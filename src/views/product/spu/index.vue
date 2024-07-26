<template>
  <div style="height: 100%">
    <Category :scene="scene" />
    <el-card style="margin-top: 10px">
      <div v-show="scene === 0">
        <el-button
          type="success"
          plain
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
        >
          添加spu
        </el-button>
        <el-table
          style="width: 100%; margin: 10px 0"
          max-height="640"
          border
          stripe
          :data="records"
        >
          <el-table-column
            label="序号"
            width="100px"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column
            label="SPU名称"
            align="center"
            prop="spuName"
          ></el-table-column>
          <el-table-column
            label="SPU描述"
            align="center"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button
                type="primary"
                icon="Plus"
                circle
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="Edit"
                circle
                @click="editSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="View"
                circle
                @click="findSku(row)"
              ></el-button>
              <el-popconfirm
                :title="`您确认要删除SPU'${row.spuName}'?`"
                icon="Delete"
                @confirm="deleteSpu(row.id)"
              >
                <template #reference>
                  <el-button type="danger" icon="Delete" circle></el-button>
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
          @sizeChange="getHasSpu(pageNo)"
          @currentChange="getHasSpu(pageNo)"
        />
      </div>
      <div v-show="scene === 1">
        <SpuForm ref="spuRef" @changeScene="changeScene" />
      </div>
      <div v-show="scene === 2">
        <SkuForm
          ref="skuRef"
          v-show="scene == 2"
          @changeScene="changeScene"
        ></SkuForm>
      </div>
      <!-- dialog对话框:展示已有的SKU数据 -->
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #default="{ row }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
                alt=""
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Category from '@/components/Category/index.vue'
import { onBeforeUnmount, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category.ts'
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu'
import SkuForm from '@/views/product/spu/skuForm.vue'
import SpuForm from '@/views/product/spu/spuForm.vue'
import type { SpuData, SkuInfoData, SkuData } from '@/api/product/spu/type.ts'
import { ElMessage } from 'element-plus'

let scene = ref(0)
let pageNo = ref(1)
let pageSize = ref(6)
let total = ref(0)
let records = ref<SpuData[]>([])

let spuRef = ref()
let skuRef = ref()

let skuArr = ref<SkuData[]>([]) //存储全部的SKU数据
let show = ref<boolean>(false)
const categoryStore = useCategoryStore()

//添加SKU按钮的回调
const addSku = (row: SpuData) => {
  //点击添加SKU按钮切换场景为2
  scene.value = 2
  //调用子组件的方法初始化添加SKU的数据
  skuRef.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

//查看SKU列表的数据
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    show.value = true
  }
}

//删除已有的SPU按钮的回调
const deleteSpu = async (spuId: number) => {
  let result: any = await reqRemoveSpu(spuId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //获取剩余SPU数据
    await getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
// 修改spu数据
const editSpu = (row: SpuData) => {
  scene.value = 1
  // console.log(row)
  spuRef.value.initHasSpuData(row)
}
// 添加spu数据
const addSpu = () => {
  scene.value = 1
  // console.log(row)
  spuRef.value.initAddSpu(categoryStore.c3Id)
}
// 切换spu场景
const changeScene = (obj: any) => {
  // console.log(obj)
  scene.value = obj.flag
  if (obj.params == 'update') {
    //更新留在当前页
    getHasSpu(pageNo.value)
  } else {
    //添加留在第一页
    getHasSpu()
  }
}
// 获取spu数据
const getHasSpu = async (page = 1) => {
  pageNo.value = page
  const result = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  // console.log(result)
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
defineOptions({ name: 'SPU' })
</script>

<style scoped lang="scss"></style>
