<template>
  <div>
    <wv-group title="我的公司">
      <wv-cell :title="item.title" is-link @click="showJob(item)" v-for="(item, key) in companyList" :key="key" />
    </wv-group>
    <wv-popup :visible.sync="ctrl.job">
      <wv-switch title="关闭" v-model="ctrl.job" />
      <wv-group>
        <wv-radio title="选择岗位" v-model="jobId" :options="jobList" @change="onChange"></wv-radio>
        <wv-input label="附言" placeholder="请输入"></wv-input>
        <wv-button type="primary">约面试</wv-button>
      </wv-group>
    </wv-popup>
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getJobList } from '@/wx/service/job'
import { getCompanyList } from '@/wx/service/company'

export default {
  name: 'job-post',
  props: [ 'itemId' ],
  components: {
  },
  mounted(){
    getJobList()
    .then((data) => {
      const items = data ||[];
      this.jobList = items.map(it => {
        return { value: it.id, label: it.title }
      })
    })
    .catch(catchHandler)
    getCompanyList()
    .then((data) => {
      this.companyList = data
    })
    .catch(catchHandler)
  },
  data(){
    return {
      ctrl: {
        job: false,
        jd: false
      },
      company: {},
      companyList: [],
      jobId: '',
      jobList: [{ values: []}]
    }
  },
  computed: {
  },
  methods: {
    showJob(item){
      this.company = item
      this.ctrl.job = true
    },
    onChange(val){
      this.jobId = val
    }
  }
}
</script>

<style>
</style>
