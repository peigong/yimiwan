<template>
  <div>
    <x-layout menu-active="media">
      <el-form :inline="true" :model="params" class="">
        <el-form-item label="类别">
          <el-select v-model="params.classification" placeholder="类别">
            <el-option label="全部" value=""></el-option>
            <el-option label="公司视频" value="company-video"></el-option>
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
        <el-table-column prop="classification.sn" label="类别编号"></el-table-column>
        <el-table-column prop="classification.name" label="类别名称"></el-table-column>
        <el-table-column prop="mediaid" label="ID"></el-table-column>
        <el-table-column prop="url" label="URL"></el-table-column>
        <el-table-column prop="summary" label="说明"></el-table-column>
         <el-table-column label="审核状态">
           <template slot-scope="scope">
             <el-button type="default" size="mini" v-if="1 == scope.row.status">待审核</el-button>
             <el-button type="success" size="mini" v-if="2 == scope.row.status">已通过</el-button>
             <el-button type="warning" size="mini"  v-if="3 == scope.row.status">已驳回</el-button>
           </template>
          </el-table-column>
         <el-table-column label="操作" width="400">
           <template slot-scope="scope">
             <el-button type="primary" size="mini" @click="showImageViewer(scope.row)" v-if="1 == scope.row.type">查看图片</el-button>
             <el-button type="primary" size="mini" @click="showTxVideoViewer(scope.row)" v-if="3 == scope.row.type">查看视频</el-button>
             <el-button type="success" size="mini" @click="approve(scope.row)" v-if="1 == scope.row.status">通过</el-button>
             <el-button type="warning" size="mini" @click="reject(scope.row)" v-if="1 == scope.row.status">驳回</el-button>
             <el-button type="primary" size="mini" @click="showCompanyDetails(scope.row)" v-if="'company' == scope.row.refer">公司信息</el-button>
         </template>
         </el-table-column>
       </el-table>
    </x-layout>
    <image-viewer :items="images" :bell="bell.image" />
    <tx-video-viewer :items="videos" :bell="bell.viewer" />
    <company-details :item-id="companyId" :bell="bell.details" />
  </div>
</template>

<script>
import { catchHandler, success } from '@/x/util/ui'
import { Status, getMediaUrl, getMediaList, approve, reject } from '@/x/service/media'
import xLayout from '@/x/components/x-layout'
import imageViewer from '@/x/components/image-viewer'
import txVideoViewer from '@/x/components/tx-video-viewer'
import companyDetails from '@/x/components/company-details'

export default {
  name: 'app',
  components: {
    xLayout,
    imageViewer,
    txVideoViewer,
    companyDetails
  },
  mounted(){
    this.getList()
  },
  data(){
    return {
      params: {
        classification: '',
        keywords: '',
        status: Status.Unaudited
      },
      items: [],

      bell: {
        viewer: 0,
        image: 0,
        details: 0
      },
      companyId: '',
      images: [],
      videos: []
    }
  },
  methods: {
    getList(){
      this.items = []
      getMediaList(this.params).then(data => {
        const items = data || []
        this.items = items.map(item => {
          item.satus = items.status || Status.Unaudited
          item.url = item.url || ''
          return item
        })
      })
      .catch(catchHandler)
    },
    doSearch(){
      this.getList()
    },
    showImageViewer(it){
      it.url = getMediaUrl(it)
      this.images = [ it ]
      this.bell.image++
    },
    showTxVideoViewer(item){
      this.videos = [ item ]
      this.bell.viewer++
    },
    showCompanyDetails(item){
      this.companyId = item.topical
      this.bell.details++
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
