<template>
  <div class="flow-list">
    <message-item v-for="(item, key) in items" :item="item" :key="key" />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getMessageList } from '@/wx/service/message'
import messageItem from '@/wx/components/message-item'

export default {
  name: 'message-list',
  components: {
    messageItem
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
