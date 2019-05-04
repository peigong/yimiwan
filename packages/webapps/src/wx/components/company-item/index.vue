<template>
<dl class="flow-list__item">
  <dt>[{{ item.classification.name }}]{{ item.title }}</dt>
  <dd>
    <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleCompany">公司介绍</wv-button>
    <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleJD">职位信息</wv-button>
  </dd>
  <dd v-if="ctrl.company">
    <company-details />
  </dd>
  <dd v-if="ctrl.jd">
    <job-list />
  </dd>
</dl>
</template>

<script>
import companyDetails from '@/wx/components/company-details'
import jobList from '@/wx/components/job-list'

export default {
  name: 'company-item',
  props: [ 'item' ],
  components: {
    companyDetails,
    jobList
  },
  data(){
    return {
      ctrl: {
        company: false,
        jd: false
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
    }
  }
}
</script>

<style>
</style>
