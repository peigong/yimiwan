<template>
  <div>
    <wv-group title="回复主题">
      <wv-input placeholder="请输入回复主题" v-model="params.title"></wv-input>
    </wv-group>
    <wv-group title="回复内容">
      <wv-textarea placeholder="请输入回复内容" :rows="3" :show-counter="false" v-model="params.content"></wv-textarea>
    </wv-group>
    <wv-button type="primary" @click="submit">回复</wv-button>
  </div>
</template>

<script>
import { catchHandler, success, fail } from '@/wx/util/ui'
import { MessageType } from '@/wx/enums'
import { createMessage } from '@/wx/service/message'

export default {
  name: 'message-reply',
  props: [ 'item' ],
  components: {
  },
  data(){
    return {
      params: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    getParams(){
      const params = { ...this.params }
      params.type = MessageType.ToMessage
      const { _id, openid } = this.item
      params.to = openid // 发送给
      params.topical = _id // 所回复的消息ID
      params.refer = ''
      if(!params.title){
        fail('请填写回复标题')
        return false
      }
      return params
    },
    reset(){
      this.params.title = ''
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
