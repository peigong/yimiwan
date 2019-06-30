<template>
  <div>
    <dl class="flow-list__item">
      <dt class="weui-media-box__title">{{ item.title }}</dt>
      <dd class="weui-media-box__desc flow-list__item__description">{{ item.content }}</dd>
      <dd>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleCompany" v-if="isCompany">公司信息</wv-button>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleJob" v-if="isJob">岗位信息</wv-button>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleApplicant" v-if="isApplicant">简历信息</wv-button>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleMessage">往来信息</wv-button>
        <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="reply">回复</wv-button>
      </dd>
      <dd v-if="ctrl.company" class="flow-list__item__description">
        <company-details :item-id="item.refer" />
      </dd>
      <dd v-if="ctrl.job" class="flow-list__item__description">
        <job-details :item-id="item.topical" />
      </dd>
      <dd v-if="ctrl.applicant" class="flow-list__item__description">
        <applicant-details :item-id="item.topical" />
      </dd>
      <dd v-if="ctrl.message" class="flow-list__item__description">
        <message-reply-list :item-id="item._id" />
      </dd>
    </dl>
    <wv-popup :visible.sync="ctrl.reply">
      <wv-switch title="关闭" v-model="ctrl.reply" />
      <message-reply :item="message" @changed="changedHandler" />
    </wv-popup>
  </div>
</template>

<script>
import { MessageType } from '@/wx/enums'
import companyDetails from '@/wx/components/company-details'
import jobDetails from '@/wx/components/job-details'
import messageReplyList from '@/wx/components/message-reply-list'
import messageReply from '@/wx/components/message-reply'

export default {
  name: 'message-item',
  props: [ 'item' ],
  components: {
    companyDetails,
    jobDetails,
    messageReplyList,
    messageReply
  },
  mounted(){
  },
  data(){
    return {
      ctrl: {
        company: false,
        job: false,
        applicant: false,
        message: false,
        reply: false
      },
      message: {}
    }
  },
  computed: {
    isJob(){
      return (this.item.type === MessageType.ToApplicant) || (this.item.type === MessageType.ToApplicantIntent)
    },
    isCompany(){
      return (this.item.type === MessageType.ToApplicant) || (this.item.type === MessageType.ToApplicantIntent)
    },
    isApplicant(){
      return (this.item.type === MessageType.ToJob) || (this.item.type === MessageType.ToJobIntent)
    }
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
    toggleJob(){
      const type = 'job'
      if(this.ctrl[type]){
        this.toggle()
      }else{
        this.toggle(type)
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
      this.message = { ...this.item }
      this.ctrl.reply = true
    },
    changedHandler(){
      this.ctrl.reply = false
      this.message = {}
    }
  }
}
</script>

<style>
</style>
