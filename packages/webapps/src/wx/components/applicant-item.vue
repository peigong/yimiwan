<template>
  <dl class="flow-list__item">
    <dt>[{{ item.name }}]{{ item.title }}</dt>
    <dd>
      <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleDetails">看信息</wv-button>
      <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toApplicant">约面试</wv-button>
      <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toApplicantIntent">联系小依</wv-button>
    </dd>
    <dd v-if="ctrl.details">
      <applicant-details :item-id="item._id" />
    </dd>
  </dl>
</template>

<script>
import { MessageType } from '@/wx/enums'
import applicantDetails from '@/wx/components/applicant-details'
import companyPost from '@/wx/components/company-post'
export default {
  name: 'applicant-item',
  props: [ 'item' ],
  components: {
    applicantDetails,
    companyPost
  },
  data(){
    return {
      ctrl: {
        details: false
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
    toggleDetails(){
      const type = 'details'
      if(this.ctrl[type]){
        this.toggle()
      }else{
        this.toggle(type)
      }
    },
    toApplicant(){
      this.$emit('message', MessageType.ToApplicant, { ...this.item })
    },
    toApplicantIntent(){
      this.$emit('message', MessageType.ToApplicantIntent, { ...this.item })
    }
  }
}
</script>

<style>
</style>
