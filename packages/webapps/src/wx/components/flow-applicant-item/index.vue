<template>
  <dl class="flow-list__item">
    <dt>[{{ item.classification.name }}]{{ item.title }}</dt>
    <dd>
      <wv-button type="default" :mini="true" class="flow-list__item_btn" @click="toggleCV">看简历</wv-button>
      <wv-button type="default" :mini="true" class="flow-list__item_btn" @click="toggleInterview">约面试</wv-button>
    </dd>
    <dd v-if="ctrl.cv">
      <cv-description-details />
    </dd>
    <dd v-if="ctrl.interview">
      <job-post />
    </dd>
  </dl>
</template>

<script>
import cvDescriptionDetails from '@/wx/components/cv-description-details'
import jobPost from '@/wx/components/job-post'
export default {
  name: 'flow-applicant-item',
  props: [ 'item' ],
  components: {
    cvDescriptionDetails,
    jobPost
  },
  data(){
    return {
      ctrl: {
        cv: false,
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
    toggleCV(){
      const type = 'cv'
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
