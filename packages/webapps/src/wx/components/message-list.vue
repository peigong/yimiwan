<template>
  <div>
    <div v-if="!items.length" class="alert alert-info">暂无消息</div>
    <div class="flow-list" v-if="items.length">
      <message-item v-for="(item, key) in items" :item="item" :key="key" />
    </div>
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
