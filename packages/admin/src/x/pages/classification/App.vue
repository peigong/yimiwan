<template>
  <div>
    <x-layout menu-active="system-classification">
      <el-row>
        <el-button type="primary" size="mini" @click="showEditor()">添加类别</el-button>
      </el-row>
      <el-table :data="items" style="width: 100%">
        <el-table-column
          prop="sn"
          label="类别编码"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="类别名称"
          width="400">
        </el-table-column>
        <el-table-column label="生效状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="setActive(scope.row)">
            </el-switch>
          </template>
         </el-table-column>
         <el-table-column label="操作">
           <template slot-scope="scope">
             <el-button size="mini" @click="showEditor(scope.row)">修改</el-button>
             <el-button size="mini" @click="showEditor()">添加</el-button>
           </template>
         </el-table-column>
       </el-table>
    </x-layout>
    <classification-editor :item="item" :bell="bell" @changed="changedHandler" />
  </div>
</template>

<script>
import { catchHandler, success } from '@/x/util/ui'
import { getClassificationList, updateClassification } from '@/x/service/classification'
import xLayout from '@/x/components/x-layout'
import classificationEditor from '@/x/components/classification-editor'

export default {
  name: 'app',
  components: {
    xLayout,
    classificationEditor
  },
  mounted(){
    this.getClassificationList()
  },
  data(){
    return {
      bell: 0,
      item: {},
      items: []
    }
  },
  methods: {
    getClassificationList(){
      getClassificationList().then(data => {
        this.items = data || []
      }).catch(catchHandler)
    },
    changedHandler(){
      this.getClassificationList()
    },
    setActive(item){
      const params = { id: item._id, ... item }
      updateClassification(params)
      .then(() => {
        success('生效状态设置成功！')
      })
      .catch(catchHandler)
    },
    showEditor(item) {
      this.item = item || {}
      this.bell++
    }
  }
}
</script>

<style>
</style>
