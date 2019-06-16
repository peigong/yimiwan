<template>
  <div>
    <wv-tabs>
      <wv-tab title="基本信息">
        <applicant-edit :item="applicant" @changed="applicantEditChangeHandler" />
      </wv-tab>
      <wv-tab title="我的照片">
        <image-list v-if="!!applicantId" type="applicant-image" item-type="applicant" :item-id="applicantId" :items='applicantImages' />
      </wv-tab>
      <wv-tab title="我的信息">
        <message-job-list />
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getApplicantDetails } from '@/wx/service/applicant'
import applicantEdit from '@/wx/components/applicant-edit'
import imageList from '@/wx/components/image-list'
import messageJobList from '@/wx/components/message-job-list'

export default {
  name: 'applicant-info',
  props: [],
  components: {
    applicantEdit,
    imageList,
    messageJobList
  },
  mounted(){
    this.getApplicantDetails()
  },
  data(){
    return {
      applicant: {},
      applicantId: '',
      applicantImages: []
    }
  },
  methods: {
    getApplicantDetails(){
      getApplicantDetails()
      .then(data => {
        this.applicant = data
        this.applicantId = data.openid || ''
        this.applicantImages = data.images || []
      })
      .catch(catchHandler)
    },
    applicantEditChangeHandler(){
      this.getApplicantDetails()
    }
  }
}
</script>

<style>
</style>
