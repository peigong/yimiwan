<template>
  <div>
    <wv-tabs ref="tabs">
      <wv-tab title="我的公司">
        <wv-group title="公司列表">
          <wv-cell :title="item.title" is-link @click="showCompanyEdit(item)" v-for="(item, key) in companyList" :key="key" />
        </wv-group>
        <wv-button type="default" class="btn-handler" :mini="true" @click="showCompanyEdit()">添加公司信息</wv-button>
      </wv-tab>
      <wv-tab title="我的岗位">
        <wv-cell title="选择公司" is-link :value="company.title" @click.native="ctrl.companyPicker = true" />
        <wv-group title="岗位列表">
          <wv-cell :title="item.title" is-link @click="showJobEdit(item)" v-for="(item, key) in jobList" :key="key" />
        </wv-group>
        <wv-button type="default" class="btn-handler" :mini="true" @click="showJobEdit()">添加岗位信息</wv-button>
      </wv-tab>
      <wv-tab title="我的信息">
      </wv-tab>
    </wv-tabs>
    <wv-popup :visible.sync="ctrl.company">
      <wv-group>
        <wv-switch title="关闭" v-model="ctrl.company"/>
        <wv-cell title="查看岗位列表" is-link @click="showJob" />
        <company-edit />
      </wv-group>
    </wv-popup>
    <wv-popup :visible.sync="ctrl.job">
      <wv-group>
        <wv-switch title="关闭" v-model="ctrl.job"/>
        <job-edit />
      </wv-group>
    </wv-popup>
    <wv-picker
      :visible.sync="ctrl.companyPicker"
      :columns="companyListPicker"
      value-key="title"
      @change="onCompanyChange"
    />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getJobList } from '@/service/job'
import { getCompanyList } from '@/service/company'
import companyEdit from '@/wx/components/company-edit'
import jobEdit from '@/wx/components/job-edit'

export default {
  name: 'company-info',
  props: [],
  components: {
    companyEdit,
    jobEdit
  },
  mounted(){
    getJobList()
    .then((data) => {
      this.jobList = data
    })
    .catch(catchHandler)
    getCompanyList()
    .then((data) => {
      this.companyList = data
      this.companyListPicker[0].values = data
    })
    .catch(catchHandler)
  },
  data(){
    return {
      ctrl: {
        company: false,
        companyPicker: false,
        job: false
      },
      company: {},
      companyList: [],
      companyListPicker: [{ values: [] }],
      job: {},
      jobList: []
  }
  },
  computed: {
  },
  methods: {
    showJob(){
      this.ctrl.company = false
      this.$refs.tabs.setCurActive(1)
  },
    showCompanyEdit(item = {}){
      this.company = item
      this.ctrl.company = true
    },
    showJobEdit(item = {}){
      this.job = item
      this.ctrl.job = true
    },
    onCompanyChange(picker, values){
      this.company = values[0]
    }
  }
}
</script>

<style>
</style>
