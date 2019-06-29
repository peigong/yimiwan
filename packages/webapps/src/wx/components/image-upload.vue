<template>
  <div>
    <wv-button type="primary" @click.native="ctrl.upload = true">上传照片</wv-button>
    <wv-popup :visible.sync="ctrl.upload">
      <wv-switch title="关闭" v-model="ctrl.upload" />
      <wv-group>
        <wv-cell title="选择分类" is-link :value="classification.name" @click.native="ctrl.classification = true" />
        <wv-input label="照片说明" placeholder="照片说明" v-model="media.summary"></wv-input>
        <wx-upload label="照片" @changed="uploadHandler" />
        <wv-button type="primary" @click="upload">确定</wv-button>
      </wv-group>
    </wv-popup>
    <wv-picker
      :visible.sync="ctrl.classification"
      :columns="classificationList"
      value-key="name"
      @change="classificationChangeHandler"
    />
  </div>
</template>

<script>
import { catchHandler, success, fail } from '@/wx/util/ui'
import { Type, createMedia } from '@/wx/service/media'
import wxUpload from '@/wx/components/wx-upload'

const def = { sn: '', name: '请选择' }

export default {
  name: 'image-upload',
  props: [ 'classifications', 'refer', 'imageTopical' ],
  components: {
    wxUpload
  },
  data(){
    return {
      ctrl: {
        upload: false,
        classification: false
      },
      topical: '',
      media: {
        mediaid: '',
        url: '',
        summary: ''
      },
      classification: { ...def },
      classificationList: [{ values: [] }]
    }
  },
  mounted(){
    this.setTopical(this.imageTopical)
    this.setClassifications(this.classifications)
  },
  watch: {
    imageTopical(val){
      this.setTopical(val || '')
    },
    classifications(val){
      this.setClassifications(val || [])
    }
  },
  methods: {
    setTopical(topical = ''){
      this.topical = topical
    },
    setClassifications(items = []){
      this.classificationList[0].values = [ { ...def }, ...items ]
    },
    reset(){
      this.ctrl.upload = false
      this.classification.sn = ''
      this.classification.name = '请选择'
      this.media.id = this.media.url = this.media.summary = ''
    },
    uploadHandler(media = {}){
      this.media.mediaid = media.mediaid || ''
      this.media.url = media.url || ''
    },
    getParams(){
      const topical = this.topical
      const refer = this.refer
      const type = Type.Image
      const classification = { ...this.classification }
      const media = { ...this.media, topical, refer, type, classification }
      if(!classification.sn){
        fail('请选择照片分类')
        return false
      }
      if(!media.mediaid){
        fail('请上传照片')
        return false
      }
      return media
    },
    upload(){
      const media = this.getParams()
      if(media){
        createMedia(media)
        .then(() => {
          this.$emit('uploaded', media)
          this.reset()
          success('上传成功')
        })
        .catch(catchHandler)
      }
    },
    classificationChangeHandler(picker, values){
      const { sn, name } = values[0]
      this.classification.sn = sn
      this.classification.name = name
    }
  }
}
</script>

<style>
</style>
