<template>
<dl class="flow-list__item">
  <dt>[{{ item.topical.company.classification.name }}]{{ item.title }}</dt>
  <dd>
    <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleJob">岗位信息</wv-button>
    <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleCompany">公司信息</wv-button>
    <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toJob">应聘</wv-button>
    <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toJobIntent">联系小依</wv-button>
  </dd>
  <dd v-if="ctrl.job">
    <job-details :item-id="item._id" />
  </dd>
  <dd v-if="ctrl.company">
    <company-details :item-id="item.topical.company._id" />
  </dd>
</dl>
</template>

<script>
import { MessageType } from '@/wx/enums'
import jobDetails from '@/wx/components/job-details'
import companyDetails from '@/wx/components/company-details'

export default {
  name: 'job-item',
  props: [ 'item' ],
  components: {
    jobDetails,
    companyDetails
  },
  data(){
    return {
      ctrl: {
        job: false,
        company: false
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
    toggleJob(){
      const type = 'job'
      if(this.ctrl[type]){
        this.toggle()
      }else{
        this.toggle(type)
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
    toJob(){
      this.$emit('message', MessageType.ToJob, { ...this.item })
    },
    toJobIntent(){
      this.$emit('message', MessageType.ToJobIntent, { ...this.item })
    }
  }
}
</script>

<style>
</style>
