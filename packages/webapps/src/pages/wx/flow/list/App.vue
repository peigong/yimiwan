<template>
  <div>
    <wv-tabs>
      <wv-tab title="招聘">
        <flow-list>
          <flow-job-item v-for="(item, key) in jobs" :item="item" :key="key" />
        </flow-list>
      </wv-tab>
      <wv-tab title="求职">
        <flow-list>
          <flow-applicant-item v-for="(item, key) in applicants" :item="item" :key="key" />
        </flow-list>
      </wv-tab>
      <wv-tab title="发布信息">
        <post-editor />
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import { catchHandler } from '@/util/ui'
import flowList from '@/components/flow-list'
import flowApplicantItem from '@/components/flow-applicant-item'
import flowJobItem from '@/components/flow-job-item'
import postEditor from '@/components/post-editor'
import { getJobs, getApplicants } from '@/service/flow'
export default {
  name: 'app',
  components: {
    flowList,
    flowApplicantItem,
    flowJobItem,
    postEditor
  },
  mounted(){
    getJobs()
    .then((data) => {
      this.jobs = data
    })
    .catch(catchHandler)

    getApplicants()
    .then((data) => {
      this.applicants = data
    })
    .catch(catchHandler)
  },
  data(){
    return {
      jobs: [],
      applicants: []
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
