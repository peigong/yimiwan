<template>
<dl class="flow-list__item">
  <dt>[{{ item.classification.name }}]{{ item.title }}</dt>
  <dd>
    <wv-button type="default" :mini="true" class="flow-list__item_btn" @click="toggleCompany">公司介绍</wv-button>
    <wv-button type="default" :mini="true" class="flow-list__item_btn" @click="toggleJD">职位信息</wv-button>
    <wv-button type="default" :mini="true" class="flow-list__item_btn" @click="togglePost">应聘</wv-button>
  </dd>
  <dd v-if="ctrl.company">
    <company-description-details />
  </dd>
  <dd v-if="ctrl.jd">
    <job-description-details />
  </dd>
  <dd v-if="ctrl.post">
    <cv-post />
  </dd>
</dl>
</template>

<script>
import companyDescriptionDetails from '@/wx/components/company-description-details'
import jobDescriptionDetails from '@/wx/components/job-description-details'
import cvPost from '@/wx/components/cv-post'

export default {
  name: 'flow-job-item',
  props: [ 'item' ],
  components: {
    companyDescriptionDetails,
    jobDescriptionDetails,
    cvPost
  },
  data(){
    return {
      ctrl: {
        company: false,
        jd: false,
        post: false
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
    togglePost(){
      const type = 'post'
      if(this.ctrl[type]){
        this.toggle()
      }else{
        this.toggle(type)
      }
    }
  }
}
</script>

<style>
</style>
