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
        <el-table-column prop="mediaid" label="ID"></el-table-column>
        <el-table-column prop="summary" label="说明"></el-table-column>
         <el-table-column label="审核状态">
           <template slot-scope="scope">
             <el-button type="default" size="mini" v-if="1 == scope.row.status">待审核</el-button>
             <el-button type="success" size="mini" v-if="2 == scope.row.status">已通过</el-button>
             <el-button type="warning" size="mini"  v-if="3 == scope.row.status">已驳回</el-button>
           </template>
          </el-table-column>
         <el-table-column label="操作" width="300">
           <template slot-scope="scope">
             <el-button type="primary" size="mini" @click="showTxPlayer(scope.row)" v-if="3 == scope.row.type">查看视频</el-button>
             <el-button type="success" size="mini" @click="approve(scope.row)" v-if="1 == scope.row.status">通过</el-button>
             <el-button type="warning" size="mini" @click="reject(scope.row)" v-if="1 == scope.row.status">驳回</el-button>
           </template>
         </el-table-column>
       </el-table>
    </x-layout>
    <tx-player :items="videos" :bell="bell" />
  </div>
</template>

<script>
import { catchHandler, success } from '@/x/util/ui'
import { Status, getMediaList, approve, reject } from '@/x/service/media'
import xLayout from '@/x/components/x-layout'
import txPlayer from '@/x/components/tx-player'

export default {
  name: 'app',
  components: {
    xLayout,
    txPlayer
  },
  mounted(){
    this.getList()
  },
  data(){
    return {
      params: {
        classification: '',
        keywords: '',
        status: 0
      },
      items: [],

      bell: 0,
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
          return item
        })
      }).catch(catchHandler)
    },
    doSearch(){
      this.getList()
    },
    showTxPlayer(item){
      this.videos = [item]
      this.bell++
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
