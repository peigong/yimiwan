<template>
  <div>
    <wv-tabs>
      <wv-tab title="我的公司">
        <company-edit />
      </wv-tab>
      <wv-tab title="我的岗位">
        <job-edit />
      </wv-tab>
      <wv-tab title="我的信息">
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import companyEdit from '@/wx/components/company-edit'
import jobEdit from '@/wx/components/job-edit'

export default {
  name: 'company-info',
  props: [],
  components: {
    companyEdit,
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
