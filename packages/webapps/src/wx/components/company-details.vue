<template>
  <div>
    <wv-group title="基本信息">
      <wv-cell title="公司全称" :value="item.title" />
      <img v-if="!!logo.url" :src="logo.url" max-width="100%" height="auto" />
      <img v-if="!!licence.url" :src="licence.url" max-width="100%" height="auto" />
      <wv-cell title="地址" :value="item.address" />
    </wv-group>
    <image-list :classifications="classificationList" :items='companyImages' />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { ClassificationType } from '@/wx/enums'
import { getMediaUrl } from '@/wx/service/media'
import { getCompanyDetails } from '@/wx/service/company'
import { getClassificationList } from '@/wx/service/classification'
import imageList from '@/wx/components/image-list'

let classifications = null

export default {
  name: 'company-details',
  props: [ 'itemId' ],
  components: {
    imageList,
  },
  data(){
    return {
      item: {},
      companyId: '',
      logo: {},
      licence: {},
      classificationList: [],
      companyImages: []
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
      if(this.itemId !== this.companyId){
        this.companyId = this.itemId
        getCompanyDetails(this.itemId)
        .then(data => {
          this.item = data
          this.companyId  = data._id || ''

          const logo = data.logo  || {}
          logo.url = getMediaUrl(logo)
          this.logo = logo

          const licence = data.licence  || {}
          licence.url = getMediaUrl(licence)
          this.licence = licence
          
          const images = data.images || []
          this.companyImages = images.map(item => {
            item.url = getMediaUrl(item)
            return item
          })
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
        getClassificationList(ClassificationType.CompanyImage)
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
