<template>
  <div class="flow-list">
    <message-cv-item v-for="(item, key) in items" :item="item" :key="key" />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getMessageList } from '@/wx/service/message'
import messageCvItem from '@/wx/components/message-cv-item'

export default {
  name: 'message-cv-list',
  components: {
    messageCvItem
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
