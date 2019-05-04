<template>
  <div>
    <wv-tabs>
      <wv-tab title="基本信息">
        <applicant-edit />
      </wv-tab>
      <wv-tab title="我的简历">
        <cv-info />
      </wv-tab>
      <wv-tab title="我的信息">
        <message-job-list />
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import applicantEdit from '@/wx/components/applicant-edit'
import cvInfo from '@/wx/components/cv-info'
import messageJobList from '@/wx/components/message-job-list'

export default {
  name: 'applicant-info',
  props: [],
  components: {
    applicantEdit,
    cvInfo,
    messageJobList
  },
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
</style>
