<template>
  <div>
    <wv-tabs>
      <wv-tab title="公司">
        <company-edit />
      </wv-tab>
      <wv-tab title="JD">
        <job-edit />
      </wv-tab>
      <wv-tab title="简历">
        <cv-edit />
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import companyEdit from '@/wx/components/company-edit'
import cvEdit from '@/wx/components/cv-edit'
import jobEdit from '@/wx/components/job-edit'
export default {
  name: 'post-editor',
  components: {
    companyEdit,
    cvEdit,
    jobEdit
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
