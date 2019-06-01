<template>
  <div>
    <x-layout menu-active="system-classification">
      <el-tabs v-model="parent.sn" type="card" @tab-click="tabClickHandler">
        <el-tab-pane label="顶级分类" name="top"></el-tab-pane>
        <el-tab-pane v-for="item in parents" :label="item.name" :name="item.sn" :key="item.sn"></el-tab-pane>
      </el-tabs>
      <el-row>
        <el-button type="primary" size="mini" @click="showEditor()">添加类别</el-button>
      </el-row>
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="sn" label="类别编码"></el-table-column>
        <el-table-column prop="name" label="类别名称"></el-table-column>
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
         <el-table-column prop="position" label="排序权重"></el-table-column>
         <el-table-column prop="remark" label="备注"></el-table-column>
         <el-table-column prop="parent.name" label="上级分类"></el-table-column>
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
    this.parent = { sn: 'top', name: '顶级分类' }
    this.getTopList()
    this.getList()
  },
  data(){
    return {
      bell: 0,

      parent: {},
      parents: [],

      item: {},
      items: []
    }
  },
  methods: {
    getTopList(){
      this.parents = []
      getClassificationList('top').then(data => {
        data = data || []
        this.parents = [ ...data ]
      }).catch(catchHandler)
    },
    getList(){
      this.items = []
      getClassificationList(this.parent.sn).then(data => {
        data = data || []
        this.items = [ ...data ]
      }).catch(catchHandler)
    },
    tabClickHandler(tab){
      this.parent.sn = tab.name
      this.parent.name = tab.label
      this.getList()
    },
    changedHandler(){
      this.getList()
    },
    setActive(item){
      const params = { id: item._id, ... item }
      updateClassification(params)
      .then(() => {
        success('生效状态设置成功！')
      })
      .catch(catchHandler)
    },
    showEditor(item = {}) {
      item.parent = { ...this.parent }
      this.item = item || {}
      this.bell++
    }
  }
}
</script>

<style>
</style>
