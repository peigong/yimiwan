<template>
  <div class="flow-list">
    <company-item v-for="(item, key) in items" :item="item" :key="key" />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getCompanyList } from '@/service/company'
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
  }
}
</script>

<style>
</style>
