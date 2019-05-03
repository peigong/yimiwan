<template>
  <div>
    <div>
      <wv-button type="default" :mini="true" @click="resetUserType" class="user-reset">重置</wv-button>
      <user-switch v-if="showUserSwitch" v-model="userType" />
      <div v-if="showApplicant">
        <company-list />
      </div>
      <div v-if="showRecruiter">
      </div>
    </div>
  </div>
</template>

<script>
import user from '@/wx/mixins/user'
import userSwitch from '@/wx/components/user-switch'
import companyList from '@/wx/components/company-list'

export default {
  name: 'app',
  mixins: [ user ],
  components: {
    userSwitch,
    companyList
  },
  mounted(){
  },
  data(){
    return {
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
