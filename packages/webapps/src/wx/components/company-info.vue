<template>
  <div>
    <wv-tabs ref="tabs">
      <wv-tab title="我的公司">
        <!--
        <wv-group title="在平台登记的公司：">
          <wv-cell :title="item.title" is-link @click="showCompanyEdit(item)" v-for="(item, key) in companyList" :key="key" />
          <wv-cell title="暂无公司登记 ，请先添加公司信息" v-if="!companyList.length" />
        </wv-group>
        <wv-button type="default" class="btn-handler" :mini="true" @click="showCompanyEdit()">添加公司信息</wv-button>
      -->
        <company-edit :item="companyDetails" @changed="companyEditChangeHandler" />
      </wv-tab>
      <wv-tab title="公司照片">
        <!--<wv-cell title="选择公司" is-link :value="company.title" @click.native="ctrl.companyPicker = true" />-->
        <!--<image-list type="company-image" item-type="company" :item-id="companyId" :items='companyImages' />-->
        <div v-if="!!companyId">
          <image-list :classifications="companyImageClassifications" :items="companyImages" />
          <image-upload
            type="company-image"
            refer="company"
            :image-topical="companyId"
            :classifications="companyImageClassifications"
            @uploaded="uploadedCompanyImageHandler"
          />
        </div>
      </wv-tab>
      <wv-tab title="公司视频">
        <!--<wv-cell title="选择公司" is-link :value="company.title" @click.native="ctrl.companyPicker = true" />-->
        <div v-if="!!companyId">
          <tx-video-player v-for="item in videos" :item-id="item.mediaid" :key='mediaid' />
        </div>
      </wv-tab>
      <wv-tab title="我的岗位">
        <!--<wv-cell title="选择公司" is-link :value="company.title" @click.native="ctrl.companyPicker = true" />-->
        <div v-if="!!companyId">
          <wv-group title="岗位列表">
            <wv-cell :title="item.title" is-link @click="showJobEdit(item)" v-for="(item, key) in jobList" :key="key" />
          </wv-group>
          <wv-button type="default" class="btn-handler" :mini="true" @click="showJobEdit()">添加岗位信息</wv-button>
        </div>
      </wv-tab>
      <wv-tab title="岗位照片">
        <!--<wv-cell title="选择公司" is-link :value="company.title" @click.native="ctrl.companyPicker = true" />-->
        <div v-if="!!companyId">
          <wv-cell title="选择岗位" is-link :value="job.title" @click.native="ctrl.jobPicker = true" />
          <div v-if="!!jobId">
            <image-list :classifications="jobImageClassifications" :items="jobImages" />
            <image-upload
              type="job-image"
              refer="job"
              :image-topical="jobId"
              :classifications="jobImageClassifications"
              @uploaded="uploadedJobImageHandler"
            />
        </div>
      </div>
      </wv-tab>
      <wv-tab title="我的信息">
        <message-list />
      </wv-tab>
    </wv-tabs>
    <!--
    <wv-popup :visible.sync="ctrl.company" style="overflow: auto;" height="100%">
      <wv-switch title="关闭" v-model="ctrl.company" />
      <wv-group>
        <wv-cell title="查看公司照片" is-link @click="showCompanyImage" />
        <wv-cell title="查看公司视频" is-link @click="showCompanyMedia" />
        <wv-cell title="查看岗位列表" is-link @click="showJob" />
        <company-edit :item="companyDetails" @changed="companyEditChangeHandler" />
      </wv-group>
    </wv-popup>
  -->
    <wv-popup :visible.sync="ctrl.job">
      <wv-switch title="关闭" v-model="ctrl.job" />
      <wv-group>
        <wv-cell title="查看岗位照片" is-link @click="showJobImage" />
        <job-edit :type="1" :topical="companyId" :item="job" @changed="jobEditChangeHandler" />
      </wv-group>
    </wv-popup>
    <!--
    <wv-picker
      :visible.sync="ctrl.companyPicker"
      :columns="companyListPicker"
      value-key="title"
      @change="companyPickerChangeHandler"
    />
  -->
    <wv-picker
      :visible.sync="ctrl.jobPicker"
      :columns="jobListPicker"
      value-key="title"
      @change="jobPickerChangeHandler"
    />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { ClassificationType, JobType, Refer } from '@/wx/enums'
import { getMediaUrl } from '@/wx/service/media'
import { getClassificationList } from '@/wx/service/classification'
import { getMyCompanyJob, getJobDetails } from '@/wx/service/job'
// import { getCompanyList, getCompanyDetails } from '@/wx/service/company'
import { getMyCompany } from '@/wx/service/company'

import jobEdit from '@/wx/components/job-edit'
import imageList from '@/wx/components/image-list'
import imageUpload from '@/wx/components/image-upload'
import companyEdit from '@/wx/components/company-edit'
import txVideoPlayer from '@/wx/components/tx-video-player'
import messageList from '@/wx/components/message-list'

const defaultJob = { _id: '', title: '请选择' }

export default {
  name: 'company-info',
  props: [],
  components: {
    jobEdit,
    imageList,
    imageUpload,
    companyEdit,
    txVideoPlayer,
    messageList
  },
  mounted(){
    // this.getCompanyList()
    this.getMyCompany()
    this.getJobImageClassifications()
    this.getCompanyImageClassifications()
  },
  data(){
    return {
      ctrl: {
        // company: false,
        // companyPicker: false,
        job: false,
        jobPicker: false
      },
      jobImageClassifications: [],
      companyImageClassifications: [],

      // company: {},
      companyId: '',
      companyDetails: {},
      // companyList: [],
      // companyListPicker: [{ values: [] }],
      companyImages: [],
      videos: [],
      job: { ...defaultJob },
      jobId: '',
      jobListPicker: [{ values: [] }],
      jobImages: [],
      jobList: []
  }
  },
  computed: {
  },
  methods: {
    getJobImageClassifications(){
      getClassificationList(ClassificationType.JobImage)
      .then(data => {
        this.jobImageClassifications = data || []
      })
      .catch(catchHandler)
    },
    getCompanyImageClassifications(){
      getClassificationList(ClassificationType.CompanyImage)
      .then(data => {
        this.companyImageClassifications = data || []
      })
      .catch(catchHandler)
    },
    /*
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
    */
    showJobImage(){
      this.ctrl.job = false
      this.$refs.tabs.setCurActive(4)
    },
    /*
    showCompanyEdit(item = {}){
      const id = item._id || ''
      this.company = item
      this.companyId = id
      this.getCompanyDetails(id)
      this.ctrl.company = true
    },
    */
    showJobEdit(item = {}){
      const id = item._id || ''
      this.getJobDetails(id)
      this.ctrl.job = true
    },
    /*
    companyPickerChangeHandler(picker, values){
      const item = values[0] || {}
      const id = item._id || ''
      this.company = item
      this.companyId = id
      this.getCompanyDetails(id)
      this.getJobList()
    },
    */
    jobPickerChangeHandler(picker, values){
      const item = values[0] || {}
      const id = item._id || ''
      this.ctrl.jobPicker = false
      this.getJobDetails(id)
    },
    companyEditChangeHandler(){
      this.getMyCompany()
    },
    jobEditChangeHandler(){
      this.ctrl.job = false
      this.getJobList()
    },
    uploadedCompanyImageHandler(media){
      this.companyImages.push({ ...media })
    },
    uploadedJobImageHandler(media){
      this.jobImages.push({ ...media })
    },
    getJobList(){
      const params = {}
      this.jobList = []
      this.jobListPicker[0].values = []
      if(this.companyId){
        params.type = JobType.Company
        params.topical = this.companyId
        params.refer = Refer.Company
        getMyCompanyJob(params)
        .then((data) => {
          const items = data || []
          this.jobList = items
          this.jobListPicker[0].values = [ { ...defaultJob }, ...items ]
        })
        .catch(catchHandler)
      }
    },
    getJobDetails(id){
      getJobDetails(id)
      .then(data => {
        data = data || {}
        this.job = data
        this.jobId = id
        const images = data.images || []
        this.jobImages = images.map(item => {
          item.url = getMediaUrl(item)
          return item
        })
      })
      .catch(catchHandler)
    },
    /*
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
        this.companyImages = data.images || []
        this.videos = data.videos || []
      })
      .catch(catchHandler)
    }
    */
    getMyCompany(){
      getMyCompany()
      .then(data => {
        data = data || {}
        this.companyId = data._id || ''
        this.companyDetails = data
        const images = data.images || []
        this.companyImages = images.map(item => {
          item.url = getMediaUrl(item)
          return item
        })
        this.videos = data.videos || []
      })
      .then(this.getJobList)
      .catch(catchHandler)
    },
  }
}
</script>

<style>
</style>
