<template>
  <div>
    <el-dialog title="求职者详细信息" :visible.sync="visible" width="60%" center>
      <h3>{{ item.name }} - {{ item.title }}</h3>
      <div class="ctrl">
        <el-button type="default" size="mini" v-if="1 == item.status">待审核</el-button>
        <el-button type="success" size="mini" v-if="2 == item.status">已通过</el-button>
        <el-button type="warning" size="mini"  v-if="3 == item.status">已驳回</el-button>
        <el-button type="success" size="mini" @click="approve(item)" v-if="1 == item.status">通过</el-button>
        <el-button type="warning" size="mini" @click="reject(item)" v-if="1 == item.status">驳回</el-button>
      </div>
      <el-row :gutter="20" type="flex">
        <el-col :span="7">
          <label>性别：</label>
          <span>{{ sex.name }}</span>
        </el-col>
        <el-col :span="7">
          <label>年龄：</label>
          <span>{{ item.age }}</span>
        </el-col>
        <el-col :span="7">
          <label>联系方式：</label>
          <span>{{ item.contact }}</span>
        </el-col>
      </el-row>
      <el-row>
        <label>地址：</label>
        <span>{{ item.address }}</span>
      </el-row>
      <el-row v-if="images.length">
        <h3>相关图片</h3>
        <image-list :items="images" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { Status } from '@/x/enums'
import { catchHandler, success } from '@/x/util/ui'
import { getMediaUrl } from '@/x/service/media'
import { getApplicantDetails, approve, reject } from '@/x/service/applicant'
import imageList from '@/x/components/image-list'

export default {
  props: ['itemId', 'bell'],
  components: {
    imageList
  },
  data() {
    return {
      visible: false,
      sex: {},
      item: {},
      images: []
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
        getApplicantDetails(itemId)
        .then(this.setItem)
        .catch(catchHandler)
      }else{
        this.setItem()
      }
    },
    setItem(data = {}){
      this.item = data
      this.sex = data.sex || {}
      const images = data.images || []
      this.images = images.map(it => {
        it.url = getMediaUrl(it)
        return it
      })
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
