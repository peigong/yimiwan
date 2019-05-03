<template>
  <div class="page">
    <wv-button type="default" :mini="true" @click="resetUserType" class="user-reset">重置</wv-button>
    <div v-if="showUserSwitch">
      <wv-header title="乐龄伯乐" :fixed="false" background-color="rgb(76, 175, 80)" />
      <user-switch v-model="userType" />
    </div>
    <div v-if="showApplicant">
      <applicant-info />
    </div>
    <div v-if="showRecruiter">
      <applicant-list />
    </div>
    <!--<wv-footer class="wx-footer" text="Copyright © 2019 yimiwan.com"></wv-footer>-->
    <bottom-menu type="a" />
  </div>
</template>

<script>
import user from '@/wx/mixins/user'
import userSwitch from '@/wx/components/user-switch'
import bottomMenu from '@/wx/components/bottom-menu'
import applicantInfo from '@/wx/components/applicant-info'
import applicantList from '@/wx/components/applicant-list'

export default {
  name: 'app',
  mixins: [ user ],
  components: {
    userSwitch,
    bottomMenu,
    applicantInfo,
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
