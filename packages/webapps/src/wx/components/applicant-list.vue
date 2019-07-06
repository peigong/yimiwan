<template>
  <div>
    <div v-if="!items.length" class="alert alert-info">暂无应聘，或者系统暂未审核通过</div>
    <div class="flow-list" v-if="items.length">
      <applicant-item v-for="(item, key) in items" :item="item" :key="key" @message="messageHandler" />
    </div>
    <wv-popup :visible.sync="ctrl.message">
      <wv-switch title="关闭" v-model="ctrl.message" />
      <company-post :type="messageType" :item="applicant" @changed="changedHandler" />
    </wv-popup>
  </div>
</template>

<script>
import { MessageType } from '@/wx/enums'
import { catchHandler } from '@/wx/util/ui'
import { getApplicantList } from '@/wx/service/applicant'
import applicantItem from '@/wx/components/applicant-item'
import companyPost from '@/wx/components/company-post'

export default {
  name: 'applicant-list',
  components: {
    applicantItem,
    companyPost
  },
  mounted(){
    getApplicantList()
    .then((data) => {
      this.items = data
    })
    .catch(catchHandler)
  },
  data(){
    return {
      ctrl: {
        message: false
      },
      items: [],

      messageType: MessageType.None,
      applicant: {}
    }
  },
  methods: {
    messageHandler(type, item){
      this.messageType = type || MessageType.None
      this.applicant = { ...item }
      this.ctrl.message = true
    },
    changedHandler(){
      this.ctrl.message = false
      this.messageType = MessageType.None
      this.applicant = {}
    }
  }
}
</script>

<style>
</style>
