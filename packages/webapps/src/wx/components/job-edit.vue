Job<template>
  <div>
    <wv-group title="基本信息">
      <wv-input label="岗位名称" placeholder="请输入岗位名称" v-model="params.title"></wv-input>
      <wv-input label="福利待遇" placeholder="请输入福利待遇" v-model="params.payment"></wv-input>
      <wv-input label="工作时间" placeholder="请输入工作时间" v-model="params.workhours"></wv-input>
      <wv-input label="工作地址" placeholder="请输入工作地址" v-model="params.workaddress"></wv-input>
    </wv-group>
    <wv-group title="工作内容">
      <wv-textarea placeholder="请输入工作内容" :rows="3" :show-counter="false" v-model="params.jobcontent"></wv-textarea>
    </wv-group>
    <wv-group title="工作要求">
      <wv-textarea placeholder="请输入工作要求" :rows="3" :show-counter="false" v-model="params.requirement"></wv-textarea>
    </wv-group>
    <wv-button type="primary" @click="submit">确定</wv-button>
  </div>
</template>

<script>
import { catchHandler, success } from '@/wx/util/ui'
import { Type, Refer, createJob, updateJob } from '@/wx/service/job'

export default {
  name: 'job-edit',
  props: [ 'type', 'topical', 'item' ],
  components: {
  },
  data(){
    return {
      itemId: '',
      topicalId: '',
      params: {
        title: '', // 岗位名称
        payment: '', // 福利待遇
        workhours: '', // 工作时间
        workaddress: '', // 工作地址
        remark: '', // 备注说明
        jobcontent: '', // 工作内容
        requirement: '' // 工作要求
      }
    }
  },
  mounted(){
    this.setItem(this.item)
  },
  watch: {
    item(val = ''){
      this.setItem(val)
    },
    topical(val = ''){
      this.topicalId = val
    }
  },
  methods: {
    setItem(item = {}){
      this.itemId = item._id || ''
      this.params.title = item.title || '' // 岗位名称
      this.params.payment = item.payment ||  '', // 福利待遇
      this.params.workhours = item.workhours ||  '', // 工作时间
      this.params.workaddress = item.workaddress ||  '', // 工作地址
      this.params.remark = item.remark ||  '', // 备注说明
      this.params.jobcontent = item.jobcontent ||  '', // 工作内容
      this.params.requirement = item.requirement ||  '' // 工作要求
    },
    submit(){
      let type = this.type
      let topical = this.topicalId
      let refer = Refer.None
      switch (type) {
        case Type.Company:
          refer = Refer.Company
          break;
        case Type.Intent:
          refer = Refer.Intent
          break;
        case Type.Applicant:
          refer = Refer.Applicant
          break;
        default:
      }
      const params = { type, topical, refer, ...this.params }
      const id = this.itemId || ''
      let exec = null
      let message = ''
      if(id){
        params.id = id
        exec = updateJob
        message = '修改成功'
      }else{
        exec = createJob
        message = '添加成功'
      }
      exec(params)
      .then(() => {
        success(message)
        this.$emit('changed')
      })
      .catch(catchHandler)
    }
  }
}
</script>

<style>
</style>
