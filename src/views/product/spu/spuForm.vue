<template>
  <el-form label-width="100px" v-model="SpuParams">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择SPU品牌" v-model="SpuParams.tmId">
        <el-option
          v-for="trade in trademarkArr"
          :key="trade.id"
          :label="trade.tmName"
          :value="trade.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        :rows="2"
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="SpuParams.description"
      />
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="spuImgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :before-upload="handlerUpload"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        style="width: 200px; margin-right: 10px"
        v-model="saleAttrIdAndName"
        :placeholder="
          unUsedSaleAttr.length
            ? `可选${unUsedSaleAttr.length}个销售属性`
            : '暂无销售属性'
        "
      >
        <el-option
          v-for="unAttr in unUsedSaleAttr"
          :key="unAttr.id"
          :label="unAttr.name"
          :value="`${unAttr.id}:${unAttr.name}`"
        />
      </el-select>
      <el-button
        icon="Plus"
        type="primary"
        :disabled="!saleAttrIdAndName"
        @click="addSaleAttr"
      >
        添加销售属性
      </el-button>
      <el-table
        border
        stripe
        style="height: 200px; margin-top: 10px"
        :data="spuSaleAttr"
      >
        <el-table-column
          label="序号"
          width="100px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="属性名"
          align="center"
          width="150px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="属性值" align="center">
          <template #default="{ row }">
            <el-tag
              v-for="(attr, index) in row.spuSaleAttrValueList"
              :key="attr.id"
              closable
              style="margin: 0 5px"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ (attr as SaleAttrValue).saleAttrValueName }}
            </el-tag>
            <el-input
              placeholder="请输入属性值"
              size="small"
              style="width: 150px; margin-right: 5px"
              v-if="row.flag"
              @blur="toLook(row)"
              v-model="row.saleAttrValue"
            />
            <el-button
              icon="Plus"
              size="small"
              circle
              type="success"
              plain
              v-else
              @click="
                row.flag = true;
                row.saleAttrValue = ''
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template #default="{ $index }">
            <el-button
              circle
              icon="Delete"
              type="danger"
              @click="spuSaleAttr.splice($index, 1)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="save">保存</el-button>
      <el-button @click="$emit('changeScene', { flag: 0, params: 'update' })">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {
  reqAddOrUpdateSpu,
  reqAllSaleAttr,
  reqAllTradeMark,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from '@/api/product/spu'
import {
  AllTradeMark,
  HasSaleAttr,
  HasSaleAttrResponseData,
  SaleAttr,
  SaleAttrValue,
  SpuData,
  SpuImg,
  Trademark,
} from '@/api/product/spu/type.ts'
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'

let trademarkArr = ref<Trademark[]>([]) //品牌列表
let spuImgList = ref<SpuImg[]>([]) //spu下图片列表
let spuSaleAttr = ref<SaleAttr[]>([]) //SPU下销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]) //全部销售属性
let dialogVisible = ref<boolean>(false) //照片预览显示索引
let dialogImageUrl = ref<string>('') //预览照片地址
let saleAttrIdAndName = ref('') //收集新选择的销售属性id和name
let SpuParams = ref<SpuData>({
  category3Id: '', //收集三级分类的ID
  spuName: '', //SPU的名字
  description: '', //SPU的描述
  tmId: '', //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})
let unUsedSaleAttr = computed(() => {
  return allSaleAttr.value.filter((asa) => {
    return spuSaleAttr.value.every((sa) => {
      return asa.name !== sa.saleAttrName
    })
  })
}) //未使用的销售属性

const $emit = defineEmits(['changeScene'])

// 点击保存按钮的回调
const save = async () => {
  //整理参数
  //1:照片墙的数据
  SpuParams.value.spuImageList = spuImgList.value.map((item: any) => {
    return {
      imgName: item.name, //图片的名字
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  //2:整理销售属性的数据
  SpuParams.value.spuSaleAttrList = spuSaleAttr.value
  let result = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
    //通知父组件切换场景为0
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage.error('系统数据，不能修改')
  }
}
// 输入框失去焦点事件回调
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  //非法情况判断
  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空的',
    })
    return
  }
  //判断属性值是否在数组当中存在
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })

  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    })
    return
  }

  //追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  //切换为查看模式
  row.flag = false
}
// 添加销售属性按钮的回调
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  spuSaleAttr.value.push(newSaleAttr)
  saleAttrIdAndName.value = ''
}
// 获取spu下数据
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
  const res_tm = await reqAllTradeMark()
  const res_img = await reqSpuImageList(spu.id as number)
  const res_sa = await reqSpuHasSaleAttr(spu.id as number)
  const res_asa = await reqAllSaleAttr()

  trademarkArr.value = res_tm.data
  spuImgList.value = res_img.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  spuSaleAttr.value = res_sa.data
  allSaleAttr.value = res_asa.data
}
//SPU初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
  //清空数据
  Object.assign(SpuParams.value, {
    category3Id: '', //收集三级分类的ID
    spuName: '', //SPU的名字
    description: '', //SPU的描述
    tmId: '', //品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
  })
  //清空照片
  spuImgList.value = []
  //清空销售属性
  spuSaleAttr.value = []
  saleAttrIdAndName.value = ''
  //存储三级分类的ID
  SpuParams.value.category3Id = c3Id
  //获取全部品牌的数据
  let result: AllTradeMark = await reqAllTradeMark()
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  //存储数据
  trademarkArr.value = result.data
  allSaleAttr.value = result1.data
}
//照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  //对话框弹出来
  dialogVisible.value = true
}
//照片钱上传成功之前的钩子约束文件的大小与类型
const handlerUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF',
    })
    return false
  }
}
defineExpose({ initHasSpuData, initAddSpu })
defineOptions({ name: 'SpuForm' })
</script>

<style scoped></style>
