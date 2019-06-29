<template>
  <dl class="flow-list__item">
    <dt>[{{ item.name }}]{{ item.title }}</dt>
    <dd>
      <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleDetails">看一看</wv-button>
      <wv-button type="default" :mini="true" class="flow-list__item__btn" @click="toggleInterview">约一约</wv-button>
    </dd>
    <dd v-if="ctrl.details">
      <applicant-details :item-id="item._id" />
    </dd>
    <dd v-if="ctrl.interview">
      <job-post />
    </dd>
  </dl>
</template>

<script>
import applicantDetails from '@/wx/components/applicant-details'
import jobPost from '@/wx/components/job-post'
export default {
  name: 'applicant-item',
  props: [ 'item' ],
  components: {
    applicantDetails,
    jobPost
  },
  data(){
    return {
      ctrl: {
        details: false,
        interview: false
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
    toggleInterview(){
      const type = 'interview'
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
