<template>
  <div>
    <wv-tabs ref="tabs">
      <wv-tab title="招聘意向">
        <company-intent-list @edit="onEdit" />
      </wv-tab>
      <wv-tab title="发布信息">
        <company-intent-edit />
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import companyIntentList from '@/wx/components/company-intent-list'
import companyIntentEdit from '@/wx/components/company-intent-edit'

export default {
  name: 'company-intent',
  props: [ 'itemId' ],
  components: {
    companyIntentList,
    companyIntentEdit
  },
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
    onEdit(){
      this.$refs.tabs.setCurActive(1)
    }
  }
}
</script>

<style>
</style>
