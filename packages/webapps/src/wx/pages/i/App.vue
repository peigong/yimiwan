<template>
  <div class="page">
    <div v-if="showUserSwitch">
      <wv-header title="乐龄伯乐" :fixed="false" background-color="rgb(76, 175, 80)" />
      <user-switch v-model="userType" />
    </div>
    <div v-if="showApplicant">
      <applicant-intent />
    </div>
    <div v-if="showRecruiter">
      <company-intent />
    </div>
    <!--<wv-footer class="wx-footer" text="Copyright © 2019 yimiwan.com"></wv-footer>-->
    <bottom-menu type="i" />
    <wv-button type="default" :mini="true" @click="resetUserType" class="user-reset">重置</wv-button>
  </div>
</template>

<script>
import user from '@/wx/mixins/user'
import userSwitch from '@/wx/components/user-switch'
import bottomMenu from '@/wx/components/bottom-menu'
import applicantIntent from '@/wx/components/applicant-intent'
import companyIntent from '@/wx/components/company-intent'

export default {
  name: 'app',
  mixins: [ user ],
  components: {
    userSwitch,
    bottomMenu,
    applicantIntent,
    companyIntent
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
