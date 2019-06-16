<template>
  <div>
    <x-layout menu-active="job">
      <el-form :inline="true" :model="params" class="">
        <el-form-item label="类别">
          <el-select v-model="params.type" placeholder="类别">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="公司JD" :value="1"></el-option>
            <el-option label="招聘意向" :value="2"></el-option>
            <el-option label="求职意向" :value="3"></el-option>
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
        <el-table-column prop="title" label="说岗位明"></el-table-column>
         <el-table-column label="审核状态">
           <template slot-scope="scope">
             <el-button type="default" size="mini" v-if="1 == scope.row.status">待审核</el-button>
             <el-button type="success" size="mini" v-if="2 == scope.row.status">已通过</el-button>
             <el-button type="warning" size="mini"  v-if="3 == scope.row.status">已驳回</el-button>
           </template>
          </el-table-column>
         <el-table-column label="操作" width="400">
           <template slot-scope="scope">
             <el-button type="primary" size="mini" @click="showJobDetails(scope.row)" v-if="1 == scope.row.type">查看</el-button>
             <el-button type="success" size="mini" @click="approve(scope.row)" v-if="1 == scope.row.status">通过</el-button>
             <el-button type="warning" size="mini" @click="reject(scope.row)" v-if="1 == scope.row.status">驳回</el-button>
             <el-button type="primary" size="mini" @click="showCompanyDetails(scope.row)" v-if="'company' == scope.row.refer">公司信息</el-button>
         </template>
         </el-table-column>
       </el-table>
    </x-layout>
    <job-details :item-id="jobId" :bell="bell.job" />
    <company-details :item-id="companyId" :bell="bell.company" />
  </div>
</template>

<script>
import { catchHandler, success } from '@/x/util/ui'
import { Status, getJobList, approve, reject } from '@/x/service/job'
import xLayout from '@/x/components/x-layout'
import jobDetails from '@/x/components/job-details'
import companyDetails from '@/x/components/company-details'

export default {
  name: 'app',
  components: {
    xLayout,
    jobDetails,
    companyDetails
  },
  mounted(){
    this.getList()
  },
  data(){
    return {
      params: {
        type: '',
        keywords: '',
        status: Status.Unaudited
      },
      items: [],

      bell: {
        job: 0,
        company: 0
      },
      jobId: '',
      companyId: ''
    }
  },
  methods: {
    getList(){
      this.items = []
      getJobList(this.params).then(data => {
        const items = data || []
        this.items = items.map(item => {
          item.satus = items.status || Status.Unaudited
          return item
        })
      })
      .catch(catchHandler)
    },
    doSearch(){
      this.getList()
    },
    showJobDetails(item){
      this.jobId = item._id
      this.bell.job++
    },
    showCompanyDetails(item){
      this.companyId = item.topical
      this.bell.company++
    },
    approve(item){
      approve(item._id)
      .then(() => {
        success('审核成功')
        item.status = Status.Approved
      })
      .catch(catchHandler)
    },
    reject(item){
      reject(item._id)
      .then(() => {
        success('驳回成功')
        item.status = Status.Rejective
      })
      .catch(catchHandler)
    }
  }
}
</script>

<style>
</style>
