<template>
  <div>
    <x-layout menu-active="message">
      <el-form :inline="true" :model="params" class="">
        <el-form-item label="类别">
          <el-select v-model="params.type" placeholder="类别">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="回复的消息" :value="1"></el-option>
            <el-option label="对岗位的求职消息" :value="2"></el-option>
            <el-option label="给管理员的求职意向" :value="3"></el-option>
            <!--
            <el-option label="" :value="4"></el-option>
            <el-option label="" :value="5"></el-option>
          -->
            <el-option label="约面试消息" :value="6"></el-option>
            <el-option label="给管理员的面试意向" :value="7"></el-option>
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
        <el-table-column prop="title" label="主题"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
         <el-table-column label="审核状态">
           <template slot-scope="scope">
             <el-button type="default" size="mini" v-if="1 == scope.row.status">待审核</el-button>
             <el-button type="success" size="mini" v-if="2 == scope.row.status">已通过</el-button>
             <el-button type="warning" size="mini"  v-if="3 == scope.row.status">已驳回</el-button>
           </template>
          </el-table-column>
         <el-table-column label="操作" width="400">
           <template slot-scope="scope">
             <el-button type="success" size="mini" @click="approve(scope.row)" v-if="1 == scope.row.status">通过</el-button>
             <el-button type="warning" size="mini" @click="reject(scope.row)" v-if="1 == scope.row.status">驳回</el-button>
             <el-button type="primary" size="mini" @click="showCompanyDetails(scope.row)" v-if="scope.row.isCompany">公司</el-button>
             <el-button type="primary" size="mini" @click="showJobDetails(scope.row)" v-if="scope.row.isJob">岗位</el-button>
             <el-button type="primary" size="mini" @click="showApplicantDetails(scope.row)" v-if="scope.row.isApplicant">求职者</el-button>
             <el-button type="primary" size="mini" @click="showMessageReply(scope.row)" v-if="scope.row.isReply">回复</el-button>
         </template>
         </el-table-column>
       </el-table>
    </x-layout>
    <job-details :item-id="jobId" :bell="bell.job" />
    <company-details :item-id="companyId" :bell="bell.company" />
    <applicant-details :item-id="applicantId" :bell="bell.applicant" />
    <message-reply :item="message" :bell="bell.reply" />
  </div>
</template>

<script>
import { Status, MessageType } from '@/x/enums'
import { catchHandler, success } from '@/x/util/ui'
import { getMessageList, approve, reject } from '@/x/service/message'
import xLayout from '@/x/components/x-layout'
import jobDetails from '@/x/components/job-details'
import companyDetails from '@/x/components/company-details'
import applicantDetails from '@/x/components/applicant-details'
import messageReply from '@/x/components/message-reply'

export default {
  name: 'app',
  components: {
    xLayout,
    jobDetails,
    companyDetails,
    applicantDetails,
    messageReply
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
        company: 0,
        applicant: 0,
        reply: 0
      },
      jobId: '',
      companyId: '',
      applicantId: '',
      message: {}
    }
  },
  methods: {
    getList(){
      this.items = []
      getMessageList(this.params).then(data => {
        const items = data || []
        this.items = items.map(item => {
          item.satus = items.status || Status.Unaudited
          item.isReply =  (item.type === MessageType.ToApplicantIntent) || (item.type === MessageType.ToJobIntent)
          item.isJob =  (item.type === MessageType.ToApplicant) || (item.type === MessageType.ToApplicantIntent)
          item.isCompany = (item.type === MessageType.ToApplicant) || (item.type === MessageType.ToApplicantIntent)
          item.isApplicant = (item.type === MessageType.ToJob) || (item.type === MessageType.ToJobIntent)
          return item
        })
      })
      .catch(catchHandler)
    },
    doSearch(){
      this.getList()
    },
    showMessageReply(item){
      this.message = { ...item }
      this.bell.reply++
    },
    showJobDetails(item){
      this.jobId = item.topical
      this.bell.job++
    },
    showCompanyDetails(item){
      this.companyId = item.refer
      this.bell.company++
    },
    showApplicantDetails(item){
      this.applicantId = item.topical
      this.bell.applicant++
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
