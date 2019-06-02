<template>
  <div>
    <wv-tabs ref="tabs">
      <wv-tab title="我的公司">
        <wv-group title="在平台登记的公司：">
          <wv-cell :title="item.title" is-link @click="showCompanyEdit(item)" v-for="(item, key) in companyList" :key="key" />
          <wv-cell title="暂无公司登记 ，请先添加公司信息" v-if="!companyList.length" />
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
        <message-cv-list />
      </wv-tab>
    </wv-tabs>
    <wv-popup :visible.sync="ctrl.company" style="overflow: auto;" height="100%">
      <wv-switch title="关闭" v-model="ctrl.company" />
      <wv-group>
        <wv-cell title="查看岗位列表" is-link @click="showJob" />
        <company-edit :item-id="companyId" @changed="companyChangeHandler" />
      </wv-group>
    </wv-popup>
    <wv-popup :visible.sync="ctrl.job">
      <wv-switch title="关闭" v-model="ctrl.job" />
      <wv-group>
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
import { getJobList } from '@/wx/service/job'
import { getCompanyList } from '@/wx/service/company'
import companyEdit from '@/wx/components/company-edit'
import jobEdit from '@/wx/components/job-edit'
import messageCvList from '@/wx/components/message-cv-list'

export default {
  name: 'company-info',
  props: [],
  components: {
    companyEdit,
    jobEdit,
    messageCvList
  },
  mounted(){
    this.getCompanyList()
    getJobList()
    .then((data) => {
      this.jobList = data
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
      companyId: '',
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
      this.companyId = item._id || ''
      this.ctrl.company = true
    },
    showJobEdit(item = {}){
      this.job = item
      this.ctrl.job = true
    },
    onCompanyChange(picker, values){
      this.company = values[0]
    },
    companyChangeHandler(){
      this.ctrl.company = false
      this.getCompanyList()
    },

    getCompanyList(){
      getCompanyList()
      .then((data) => {
        this.companyList = data
        this.companyListPicker[0].values = data
      })
      .catch(catchHandler)
    }
  }
}
</script>

<style>
</style>
