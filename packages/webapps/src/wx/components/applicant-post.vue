<template>
  <div>
    <wv-group>
      <wv-input label="留言内容" placeholder="请输入" v-model="params.content"></wv-input>
    </wv-group>
    <wv-button type="primary" @click="submit">投简历</wv-button>
  </div>
</template>

<script>
import { catchHandler, success, fail } from '@/wx/util/ui'
import { MessageType } from '@/wx/enums'
import { getMyInfo } from '@/wx/service/applicant'
import { createMessage } from '@/wx/service/message'

let applicant = null

export default {
  name: 'applicant-post',
  props: [ 'type', 'item' ],
  components: {
  },
  data(){
    return {
      params: {
        content: ''
      }
    }
  },
  mounted(){
    if(applicant){
      this.setApplicant(applicant)
    }else{
      getMyInfo()
      .then(this.setApplicant)
      .catch(catchHandler)
    }
  },
  methods: {
    setApplicant(data){
      applicant = { ...data }
      this.applicant = { ...data }
    },
    getParams(){
      const params = { ...this.params }
      params.type = this.type || MessageType.None
      const { openid, title, topical } = this.item
      const { _id, name } = this.applicant
      params.title = `${ name }求职${ topical.company.title } - ${ title }`
      params.to = openid // 发送给
      params.topical = _id // 投简历的应聘者ID
      params.refer = ''
      if(!params.type){
        fail('消息类型异常')
        return false
      }
      return params
    },
    reset(){
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
    }
  }
}
</script>

<style>
</style>
