<template>
  <div>
    <wv-group title="基本信息">
      <!--
      <wv-cell title="求职意向" :value="item.title" />
      <wv-cell title="姓名" :value="item.name" />
      <wv-cell title="联系方式" :value="item.contact" />
    -->
      <wv-cell title="性别" :value="sex.name" />
      <wv-cell title="住址" :value="item.address" />
      <wv-cell title="年龄" :value="item.age" />
      <!--
      <wv-input label="" placeholder="请输入联系方式" v-model.trim="params.contact"></wv-input>
    -->
    </wv-group>
    <image-list :classifications="classificationList" :items='applicantImages' />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { ClassificationType } from '@/wx/enums'
import { getDetails } from '@/wx/service/applicant'
import { getClassificationList } from '@/wx/service/classification'
import imageList from '@/wx/components/image-list'

let classifications = null

export default {
  name: 'applicant-details',
  props: [ 'itemId' ],
  components: {
    imageList,
  },
  data(){
    return {
      sex: {},
      item: {},
      applicantId: '',
      classificationList: [],
      applicantImages: []
    }
  },
  mounted(){
    this.getDetails()
    this.getClassificationList()
  },
  watch: {
    itemId(){
      this.getDetails()
    }
  },
  methods: {
    getDetails(){
      if(this.itemId !== this.applicantId){
        this.applicantId = this.itemId
        getDetails(this.itemId)
        .then(data => {
          this.item = data
          this.sex = data.sex || {}
          this.applicantImages = data.images || []
        })
        .catch(catchHandler)
      }
    },
    localizeClassificationList(items){
      this.classificationList = items.map(item => {
        return { ...item }
      })
    },
    getClassificationList(){
      if(classifications){
        this.localizeClassificationList(classifications)
      }else{
        getClassificationList(ClassificationType.ApplicantImage)
        .then(data => {
          classifications = data || []
          this.localizeClassificationList(classifications)
        })
        .catch(catchHandler)
      }
    }
  }
}
</script>

<style>
</style>
