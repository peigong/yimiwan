<template>
  <div>
    <wv-tabs>
      <wv-tab title="基本信息">
        <applicant-edit :item="applicant" @changed="applicantEditChangeHandler" />
      </wv-tab>
      <wv-tab title="我的照片">
        <div v-if="!applicantId" class="alert alert-info">请先完善个人基本信息</div>
        <div v-if="!!applicantId">
          <div v-if="!applicantImages.length" class="alert alert-info">暂无照片，或者系统暂未审核通过</div>
          <image-list :classifications="classifications" :items="applicantImages" v-if="applicantImages.length" />
          <image-upload
            type="applicant-image"
            refer="applicant"
            :image-topical="applicantId"
            :classifications="classifications"
            @uploaded="uploadedHandler"
          />
        </div>
      </wv-tab>
      <wv-tab title="我的信息">
        <message-list />
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { ClassificationType } from '@/wx/enums'
import { getMediaUrl } from '@/wx/service/media'
import { getMyInfo } from '@/wx/service/applicant'
import { getClassificationList } from '@/wx/service/classification'

import imageList from '@/wx/components/image-list'
import imageUpload from '@/wx/components/image-upload'
import applicantEdit from '@/wx/components/applicant-edit'
import messageList from '@/wx/components/message-list'

export default {
  name: 'applicant-info',
  props: [],
  components: {
    imageList,
    imageUpload,
    applicantEdit,
    messageList
  },
  mounted(){
    this.getMyInfo()
    getClassificationList(ClassificationType.ApplicantImage)
    .then(data => {
      this.classifications = data || []
    })
    .catch(catchHandler)
  },
  data(){
    return {
      classifications: [],
      applicant: {},
      applicantId: '',
      applicantImages: []
    }
  },
  methods: {
    getMyInfo(){
      getMyInfo()
      .then(data => {
        this.applicant = data
        this.applicantId = data._id || ''
        const images = data.images || []
        this.applicantImages = images.map(item => {
          item.url = getMediaUrl(item)
          return item
        })
      })
      .catch(catchHandler)
    },
    applicantEditChangeHandler(){
      this.getMyInfo()
    },
    uploadedHandler(media){
      this.applicantImages.push(media)
    }
  }
}
</script>

<style>
</style>
