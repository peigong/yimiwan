<template>
  <div>
    <wv-group>
      <wv-cell title="公司" :value="company.title" />
      <wv-radio title="选择岗位" v-model="jobId" :options="options" @change="onChange"></wv-radio>
      <wv-input label="附言" placeholder="请输入" v-model="params.content"></wv-input>
      <wv-button type="primary" @click="submit">约面试</wv-button>
    </wv-group>
  </div>
</template>

<script>
import { catchHandler, success, fail } from '@/wx/util/ui'
import { JobType, MessageType, Refer } from '@/wx/enums'
import { getCompanyList } from '@/wx/service/company'
import { getMyCompanyJob } from '@/wx/service/job'
import { getMyCompany } from '@/wx/service/company'
import { createMessage } from '@/wx/service/message'

let company = null
let jobList = null

export default {
  name: 'company-post',
  props: [ 'type', 'item' ],
  components: {
  },
  mounted(){
    if(company){
      this.setCompany(company)
    }else{
      getMyCompany()
      .then(this.setCompany)
      .catch(catchHandler)
    }

  },
  data(){
    return {
      dict: {},
      company: {},
      params: {
        content: ''
      },
      jobId: '',
      options: []
    }
  },
  methods: {
    setCompany(data){
      data = data || {}
      company = { ...data }
      this.company = { ...data }

      if(jobList){
        this.setJobList(jobList)
      }else{
        const params = {}
        params.type = JobType.Company
        params.topical = company._id
        params.refer = Refer.Company
        getMyCompanyJob(params)
        .then(this.setJobList)
        .catch(catchHandler)
      }
    },
    setJobList(data){
      const items = data || []
      const options = []
      jobList = [ ...items ]
      items.forEach(item => {
        this.dict[item._id] = item.title
        options.push({ value: item._id, label: item.title })
      })
      this.options = options
    },
    getParams(){
      const params = { ...this.params }
      if(!this.jobId){
        fail('请选择岗位')
        return false
      }
      const title = this.dict[this.jobId]
      params.type = this.type || MessageType.None
      if(!params.type){
        fail('消息类型异常')
        return false
      }
      params.title = `${ company.title } - ${ title } 信息`
      const { openid } = this.item
      params.to = openid // 发送给
      params.topical = this.jobId // 约面试的岗位ID
      params.refer = company._id // 约面试的公司ID
      return params
    },
    reset(){
      this.jobId = ''
      this.params.content = ''
    },
    submit(){
      const params = this.getParams()
      if(params){
        createMessage(params)
        .then(() => {
          success('消息发送成功')
          this.$emit('changed')
          this.reset()
        })
        .catch(catchHandler)
      }
    },
    onChange(val){
      this.jobId = val
    }
  }
}
</script>

<style>
</style>
