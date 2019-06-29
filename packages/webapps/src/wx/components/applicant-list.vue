<template>
  <div class="flow-list">
    <applicant-item v-for="(item, key) in items" :item="item" :key="key" />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getApplicantList } from '@/wx/service/applicant'
import applicantItem from '@/wx/components/applicant-item'

export default {
  name: 'applicant-list',
  components: {
    applicantItem
  },
  mounted(){
    getApplicantList()
    .then((data) => {
      this.items = data
    })
    .catch(catchHandler)
  },
  data(){
    return {
      items: []
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
