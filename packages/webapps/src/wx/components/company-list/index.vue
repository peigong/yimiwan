<template>
  <div class="flow-list">
    <company-item v-for="(item, key) in items" :item="item" :key="key" />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getCompanyList } from '@/wx/service/company'
import companyItem from '@/wx/components/company-item'

export default {
  name: 'company-list',
  components: {
    companyItem
  },
  mounted(){
    getCompanyList()
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
