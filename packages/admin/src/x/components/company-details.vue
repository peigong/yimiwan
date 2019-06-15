<template>
  <div>
    <el-dialog title="公司详细信息" :visible.sync="visible" width="60%" center>
      <h3><span>[{{ classification.name }}]</span>{{ item.title }}</h3>
      <div class="ctrl">
        <el-button type="default" size="mini" v-if="1 == item.status">待审核</el-button>
        <el-button type="success" size="mini" v-if="2 == item.status">已通过</el-button>
        <el-button type="warning" size="mini"  v-if="3 == item.status">已驳回</el-button>
        <el-button type="success" size="mini" @click="approve(item)" v-if="1 == item.status">通过</el-button>
        <el-button type="warning" size="mini" @click="reject(item)" v-if="1 == item.status">驳回</el-button>
      </div>
      <el-row :gutter="20" type="flex">
        <el-col :span="7">
          <label>负责人：</label>
          <span>{{ item.linkman }}</span>
        </el-col>
        <el-col :span="7">
          <label>联系电话：</label>
          <span>{{ item.phone }}</span>
        </el-col>
        <el-col :span="7">
          <label>电子邮件：</label>
          <span>{{ item.email }}</span>
        </el-col>
      </el-row>
      <el-row>
        <label>公司地址：</label>
        <span>{{ item.adress }}</span>
      </el-row>
      <el-row>
        <label>业务简介：</label>
        <span>{{ item.summary }}</span>
      </el-row>
      <!--
      <h3>公司LOGO</h3>
      <el-row v-if="!!logo.url">
        <img :src="'/media/' + logo.url" max-width="100%" height="auto" />
      </el-row>
      <h3>营业执照</h3>
      <el-row v-if="!!licence.url">
        <img :src="'/media/' + licence.url" max-width="100%" height="auto" />
      </el-row>
      -->
      <el-row v-if="images.length">
        <h3>相关图片</h3>
        <image-list :items="images" />
      </el-row>
      <el-row v-if="videos.length">
        <h3>视频信息</h3>
        <tx-video-list :items="videos" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { catchHandler, success } from '@/x/util/ui'
import { getMediaUrl } from '@/x/service/media'
import { Status, getCompanyDetails, approve, reject } from '@/x/service/company'
import txVideoList from '@/x/components/tx-video-list'
import imageList from '@/x/components/image-list'

export default {
  props: ['itemId', 'bell'],
  components: {
    txVideoList,
    imageList
  },
  data() {
    return {
      visible: false,
      item: {},
      classification: {},
      images: [],
      // logo: {},
      // licence: {},
      videos: []
    };
  },
  mounted(){
    this.setItemId(this.itemId)
  },
  watch: {
    bell(){
      this.visible = true
    },
    itemId(val){
      this.setItemId(val)
    }
  },
  methods: {
    setItemId(itemId = ''){
      if(itemId){
        getCompanyDetails(itemId)
        .then(this.setItem)
        .catch(catchHandler)
      }else{
        this.setItem()
      }
    },
    setItem(data = {}){
      this.item = data
      this.classification = data.classification || {}
      // const logo = data.logo || {}
      // this.logo.url = logo.url || ''
      // const licence = data.licence || {}
      // this.licence.url = licence.url || ''
      const images = data.images || []
      this.images = images.map(it => {
        it.url = getMediaUrl(it)
        return it
      })
      this.videos = data.videos || []
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
label {
  font-weight: bold;
}
.el-dialog {
  line-height: 200%;
}
.el-dialog--center .el-dialog__body {
  padding-top: 0;
}
.ctrl {
  padding: 2px;
}
.ctrl button {
  margin: 2px;
}
</style>
