<template>
  <div>
    <wv-tabs ref="tabs">
      <wv-tab title="求职意向">
        <applicant-intent-list @edit="onEdit" />
      </wv-tab>
      <wv-tab title="发布信息">
        <applicant-intent-edit />
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import applicantIntentList from '@/wx/components/applicant-intent-list'
import applicantIntentEdit from '@/wx/components/applicant-intent-edit'

export default {
  name: 'applicant-intent',
  props: [ 'itemId' ],
  components: {
    applicantIntentList,
    applicantIntentEdit
  },
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
    onEdit(item){
      this.$refs.tabs.setCurActive(1)
    }
  }
}
</script>

<style>
</style>
