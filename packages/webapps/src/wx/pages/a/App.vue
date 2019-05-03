<template>
  <div>
    <wv-button type="default" :mini="true" @click="resetUserType" class="user-reset">重置</wv-button>
    <user-switch v-if="showUserSwitch" v-model="userType" />
    <div v-if="showApplicant">
      求职
    </div>
    <div v-if="showRecruiter">
      <applicant-list />
    </div>
  </div>
</template>

<script>
import user from '@/wx/mixins/user'
import userSwitch from '@/wx/components/user-switch'
import applicantList from '@/wx/components/applicant-list'

export default {
  name: 'app',
  mixins: [ user ],
  components: {
    userSwitch,
    applicantList
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
