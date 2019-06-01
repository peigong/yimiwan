<template>
  <div>
    <x-layout menu-active="company">
      <el-form :inline="true" :model="params" class="">
        <el-form-item label="所属行业">
          <el-select v-model="params.classification" placeholder="所属行业">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in classificationList" :label="item.name" :value="item.sn" :key="item.sn"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="params.keywords" placeholder="关键词"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model.number="params.status" placeholder="审核状态">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="待审核" :value="1"></el-option>
            <el-option label="已通过" :value="2"></el-option>
            <el-option label="已驳回" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="classification.name" label="所属行业"></el-table-column>
        <el-table-column prop="title" label="公司名称"></el-table-column>
        <el-table-column prop="linkman" label="负责人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
         <el-table-column label="审核状态">
           <template slot-scope="scope">
             <el-button type="default" size="mini" v-if="1 == scope.row.status">待审核</el-button>
             <el-button type="success" size="mini" v-if="2 == scope.row.status">已通过</el-button>
             <el-button type="warning" size="mini"  v-if="3 == scope.row.status">已驳回</el-button>
           </template>
          </el-table-column>
         <el-table-column label="操作">
           <template slot-scope="scope">
             <el-button type="primary" size="mini" @click="showDetails(scope.row)">查看</el-button>
             <el-button type="success" size="mini" @click="approve(scope.row)" v-if="1 == scope.row.status">通过</el-button>
             <el-button type="warning" size="mini" @click="reject(scope.row)" v-if="1 == scope.row.status">驳回</el-button>
           </template>
         </el-table-column>
       </el-table>
    </x-layout>
  </div>
</template>

<script>
import { catchHandler, success } from '@/x/util/ui'
import { getClassificationList } from '@/x/service/classification'
import { Status, getCompanyList, getCompanyDetails, approve, reject } from '@/x/service/company'
import xLayout from '@/x/components/x-layout'

export default {
  name: 'app',
  components: {
    xLayout,
  },
  mounted(){
    getClassificationList('industry-code').then(data => {
      data = data || []
      this.classificationList = data || []
    }).catch(catchHandler)
    this.getList()
  },
  data(){
    return {
      classificationList: [],
      params: {
        classification: '',
        keywords: '',
        status: 0
      },
      items: []
    }
  },
  methods: {
    getList(){
      this.items = []
      getCompanyList(this.params).then(data => {
        const items = data || []
        this.items = items.map(item => {
          item.satus = items.status || Status.Unaudited
          return item
        })
      }).catch(catchHandler)
    },
    doSearch(){
      this.getList()
    },
    showDetails(item){
      getCompanyDetails(item._id)
    },
    approve(item){
      approve(item._id)
      .then(() => {
        success('审核成功')
        this.getList()
      })
      .catch(catchHandler)
    },
    reject(item){
      reject(item._id)
      .then(() => {
        success('驳回成功')
        this.getList()
      })
      .catch(catchHandler)
    }
  }
}
</script>

<style>
</style>
