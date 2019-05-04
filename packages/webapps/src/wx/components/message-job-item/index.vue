<template>
  <div>
    <dl class="flow-list__item">
      <dt class="weui-media-box__title">{{ item.title }}</dt>
      <dd class="weui-media-box__desc flow-list__item__description">{{ item.content }}</dd>
      <dd>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleCompany">公司</wv-button>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleJD">职位</wv-button>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleMessage">往来信息</wv-button>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="reply">回复</wv-button>
      </dd>
      <dd v-if="ctrl.company" class="flow-list__item__description">
        <company-details />
      </dd>
      <dd v-if="ctrl.jd" class="flow-list__item__description">
        <job-details />
      </dd>
      <dd v-if="ctrl.message" class="flow-list__item__description">
        <message-list />
      </dd>
    </dl>
    <wv-popup :visible.sync="ctrl.reply">
      <wv-switch title="关闭" v-model="ctrl.reply"/>
      <message-reply />
    </wv-popup>
  </div>
</template>

<script>
import companyDetails from '@/wx/components/company-details'
import jobDetails from '@/wx/components/job-details'
import messageList from '@/wx/components/message-list'
import messageReply from '@/wx/components/message-reply'

export default {
  name: 'message-cv-item',
  props: [ 'item' ],
  components: {
    companyDetails,
    jobDetails,
    messageList,
    messageReply
  },
  mounted(){
  },
  data(){
    return {
      ctrl: {
        company: false,
        jd: false,
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
    toggleCompany(){
      const type = 'company'
      if(this.ctrl[type]){
        this.toggle()
      }else{
        this.toggle(type)
      }
    },
    toggleJD(){
      const type = 'jd'
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
