<template>
  <div>
    <wv-tabs>
      <wv-tab title="基本信息">
        <applicant-edit />
      </wv-tab>
      <wv-tab title="我的简历">
      </wv-tab>
      <wv-tab title="我的信息">
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import applicantEdit from '@/wx/components/applicant-edit'

export default {
  name: 'applicant-info',
  props: [],
  components: {
    applicantEdit
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
