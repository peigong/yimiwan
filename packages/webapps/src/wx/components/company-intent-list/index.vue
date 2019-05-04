<template>
  <div>
    <wv-group title="意向列表">
      <wv-cell :title="item.title" is-link @click="showEdit(item)" v-for="(item, key) in items" :key="key" />
    </wv-group>
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getIntentList } from '@/service/intent'

export default {
  name: 'company-intent-list',
  props: [ 'itemId' ],
  components: {
  },
  mounted(){
    getIntentList()
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
    showEdit(item){
      this.$emit('edit', item)
    }
  }
}
</script>

<style>
</style>
