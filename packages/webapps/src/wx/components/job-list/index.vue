<template>
  <div>
    <wv-group title="岗位信息">
      <wv-cell :title="item.title" is-link @click="showJobDetails(item)" v-for="(item, key) in items" :key="key" />
    </wv-group>
    <wv-popup :visible.sync="ctrl.jd">
      <wv-switch title="关闭" v-model="ctrl.jd" />
      <wv-group>
        <job-details :item="item"  />
        <cv-post />
      </wv-group>
    </wv-popup>
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getJobList } from '@/wx/service/job'
import jobDetails from '@/wx/components/job-details'
import cvPost from '@/wx/components/cv-post'

export default {
  name: 'job-list',
  props: [],
  components: {
    jobDetails,
    cvPost
  },
  mounted(){
    getJobList()
    .then((data) => {
      this.items = data
    })
    .catch(catchHandler)
  },
  data(){
    return {
      ctrl: {
        jd: false
      },
      item: {},
      items: []
    }
  },
  computed: {
  },
  methods: {
    showJobDetails(item){
      this.item = item
      this.ctrl.jd = true
    }
  }
}
</script>

<style>
</style>
