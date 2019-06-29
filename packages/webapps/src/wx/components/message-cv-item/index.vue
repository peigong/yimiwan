<template>
  <div>
    <dl class="flow-list__item">
      <dt class="weui-media-box__title">{{ item.title }}</dt>
      <dd class="weui-media-box__desc flow-list__item__description">{{ item.content }}</dd>
      <dd>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleApplicant">看简历</wv-button>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleMessage">往来信息</wv-button>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="reply">回复</wv-button>
      </dd>
      <dd v-if="ctrl.applicant" class="flow-list__item__description">
        <applicant-details />
      </dd>
      <dd v-if="ctrl.message" class="flow-list__item__description">
        <message-list />
      </dd>
    </dl>
    <wv-popup :visible.sync="ctrl.reply">
      <wv-switch title="关闭" v-model="ctrl.reply" />
      <message-reply />
    </wv-popup>
  </div>
</template>

<script>
import applicantDetails from '@/wx/components/applicant-details'
import messageList from '@/wx/components/message-list'
import messageReply from '@/wx/components/message-reply'

export default {
  name: 'message-applicant-item',
  props: [ 'item' ],
  components: {
    applicantDetails,
    messageList,
    messageReply
  },
  mounted(){
  },
  data(){
    return {
      ctrl: {
        applicant: false,
        message: false,
        reply: false
      }
    }
  },
  computed: {
  },
  methods: {
    toggle(type){
      const ctrl = this.ctrl
      Object.keys(ctrl).forEach(key => { ctrl[key] = false  })
      if(type){
        ctrl[type] = true
      }
    },
    toggleApplicant(){
      const type = 'applicant'
      if(this.ctrl[type]){
        this.toggle()
      }else{
        this.toggle(type)
      }
    },
    toggleMessage(){
      const type = 'message'
      if(this.ctrl[type]){
        this.toggle()
      }else{
        this.toggle(type)
      }
    },
    reply(){
      this.ctrl.reply = true
    }
  }
}
</script>

<style>
</style>
