<template>
  <div>
    <wv-group title="基本信息">
      <wv-cell title="岗位名称" :value="item.title" />
      <wv-cell title="福利待遇" :value="item.payment" />
      <wv-cell title="工作时间" :value="item.workhours" />
      <wv-cell title="工作地址" :value="item.workaddress" />
    </wv-group>
    <image-list :classifications="classificationList" :items='jobImages' />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { ClassificationType } from '@/wx/enums'
import { getMediaUrl } from '@/wx/service/media'
import { getJobDetails } from '@/wx/service/job'
import { getClassificationList } from '@/wx/service/classification'
import imageList from '@/wx/components/image-list'

let classifications = null

export default {
  name: 'job-details',
  props: [ 'itemId' ],
  components: {
    imageList,
  },
  data(){
    return {
      item: {},
      jobId: '',
      classificationList: [],
      jobImages: []
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
      if(this.itemId !== this.jobId){
        this.jobId = this.itemId
        getJobDetails(this.itemId)
        .then(data => {
          this.item = data
          this.jobId = data._id || ''
          const images = data.images || []
          this.jobImages = images.map(item => {
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
        getClassificationList(ClassificationType.JobImage)
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
