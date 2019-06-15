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
      <wv-tab title="公司照片">
        <wv-cell title="选择公司" is-link :value="company.title" @click.native="ctrl.companyPicker = true" />
        <image-list type="company-image" :item-id="companyId" :items='images' />
      </wv-tab>
      <wv-tab title="公司视频">
        <wv-cell title="选择公司" is-link :value="company.title" @click.native="ctrl.companyPicker = true" />
        <tx-video-player v-for="item in videos" :item-id="item.mediaid" :key='mediaid' />
      </wv-tab>
      <wv-tab title="我的岗位">
        <wv-cell title="选择公司" is-link :value="company.title" @click.native="ctrl.companyPicker = true" />
        <wv-group title="岗位列表">
          <wv-cell :title="item.title" is-link @click="showJobEdit(item)" v-for="(item, key) in jobList" :key="key" />
        </wv-group>
        <wv-button type="default" class="btn-handler" :mini="true" @click="showJobEdit()">添加岗位信息</wv-button>
      </wv-tab>
      <wv-tab title="岗位照片">
        公司图片
      </wv-tab>
      <wv-tab title="我的信息">
        <message-cv-list />
      </wv-tab>
    </wv-tabs>
    <wv-popup :visible.sync="ctrl.company" style="overflow: auto;" height="100%">
      <wv-switch title="关闭" v-model="ctrl.company" />
      <wv-group>
        <wv-cell title="查看公司照片" is-link @click="showCompanyImage" />
        <wv-cell title="查看公司视频" is-link @click="showCompanyMedia" />
        <wv-cell title="查看岗位列表" is-link @click="showJob" />
        <company-edit :item="companyDetails" @changed="companyEditChangeHandler" />
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
      @change="companyPickerChangeHandler"
    />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getJobList } from '@/wx/service/job'
import { getCompanyList, getCompanyDetails } from '@/wx/service/company'
import companyEdit from '@/wx/components/company-edit'
import imageList from '@/wx/components/image-list'
import txVideoPlayer from '@/wx/components/tx-video-player'
import jobEdit from '@/wx/components/job-edit'
import messageCvList from '@/wx/components/message-cv-list'

export default {
  name: 'company-info',
  props: [],
  components: {
    companyEdit,
    imageList,
    txVideoPlayer,
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
      companyDetails: {},
      companyList: [],
      companyListPicker: [{ values: [] }],
      images: [],
      videos: [],
      job: {},
      jobList: []
  }
  },
  computed: {
  },
  methods: {
    showCompanyImage(){
      this.ctrl.company = false
      this.$refs.tabs.setCurActive(1)
    },
    showCompanyMedia(){
      this.ctrl.company = false
      this.$refs.tabs.setCurActive(2)
    },
    showJob(){
      this.ctrl.company = false
      this.$refs.tabs.setCurActive(3)
    },
    showCompanyEdit(item = {}){
      const id = item._id || ''
      this.company = item
      this.companyId = id
      this.getCompanyDetails(id)
      this.ctrl.company = true
    },
    showJobEdit(item = {}){
      this.job = item
      this.ctrl.job = true
    },
    companyPickerChangeHandler(picker, values){
      const item = values[0] || {}
      const id = item._id || ''
      this.company = item
      this.companyId = id
      this.getCompanyDetails(id)
    },
    companyEditChangeHandler(){
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
    },
    getCompanyDetails(id){
      getCompanyDetails(id)
      .then(data => {
        data = data || {}
        this.companyDetails = data
        this.images = data.images || []
        this.videos = data.videos || []
      })
      .catch(catchHandler)
    }
  }
}
</script>

<style>
</style>
