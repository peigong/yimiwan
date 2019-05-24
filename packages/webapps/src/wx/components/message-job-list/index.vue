<template>
  <div class="flow-list">
    <message-job-item v-for="(item, key) in items" :item="item" :key="key" />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getMessageList } from '@/wx/service/message'
import messageJobItem from '@/wx/components/message-job-item'

export default {
  name: 'message-job-list',
  components: {
    messageJobItem
  },
  mounted(){
    getMessageList()
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
