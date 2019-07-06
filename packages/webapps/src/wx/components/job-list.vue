<template>
  <div>
    <div v-if="!items.length" class="alert alert-info">暂无岗位，或者系统暂未审核通过</div>
    <div class="flow-list" v-if="items.length">
      <job-item v-for="(item, key) in items" :item="item" :key="key" @message="messageHandler" />
    </div>
    <wv-popup :visible.sync="ctrl.message">
      <wv-switch title="关闭" v-model="ctrl.message" />
      <applicant-post :type="messageType" :item="job" @changed="changedHandler" />
    </wv-popup>
  </div>
</template>

<script>
import { MessageType } from '@/wx/enums'
import { catchHandler } from '@/wx/util/ui'
import { getJobList } from '@/wx/service/job'
import jobItem from '@/wx/components/job-item'
import applicantPost from '@/wx/components/applicant-post'

export default {
  name: 'job-list',
  components: {
    jobItem,
    applicantPost
  },
  mounted(){
    getJobList()
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
      job: {}
    }
  },
  methods: {
    messageHandler(type, item){
      this.messageType = type || MessageType.None
      this.job = { ...item }
      this.ctrl.message = true
    },
    changedHandler(){
      this.ctrl.message = false
      this.messageType = MessageType.None
      this.job = {}
    }
  }
}
</script>

<style>
</style>
