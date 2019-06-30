<template>
  <div class="flow-list">
    <job-item v-for="(item, key) in items" :item="item" :key="key" />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getJobList } from '@/wx/service/job'
import jobItem from '@/wx/components/job-item'

export default {
  name: 'job-list',
  components: {
    jobItem
  },
  mounted(){
    getJobList()
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
