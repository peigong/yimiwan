<template>
  <div>
    <wv-group :title="item.name" v-for="item in classifications" :key="item.sn">
      <div v-for="it in item.images" :key="it._id">
        <img v-if="!!it.url" :src="it.url" max-width="100%" height="auto" />
      </div>
    </wv-group>
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
import { getClassificationList } from '@/wx/service/classification'
import { Type, getMediaUrl, createMedia } from '@/wx/service/media'
import wxUpload from '@/wx/components/wx-upload'

const def = { sn: '', name: '请选择' }

export default {
  name: 'image-list',
  props: [ 'type', 'itemType', 'itemId', 'items' ],
  components: {
    wxUpload
  },
  data(){
    return {
      ctrl: {
        upload: false,
        classification: false
      },
      dict: {},
      topical: '',
      media: {
        mediaid: '',
        url: '',
        summary: ''
      },
      classification: { ...def },
      classifications: [],
      classificationList: [{ values: [] }]
    }
  },
  mounted(){
    const type = this.type || ''
    if(type){
      getClassificationList(type)
      .then(data => {
        const items = data || []
        this.classifications = this.classificationList[0].values = items.map((item) => {
          item.images = []
          this.dict[item.sn] = item
          return item
        })
        this.setItems(this.items)
        this.setItemId(this.itemId)
        this.classificationList[0].values.unshift({ ...def })
      })
      .catch(catchHandler)
    }
  },
  watch: {
    items(val = []){
      const images = val || []
      this.setItems(images)
    },
    itemId(val){
      this.setItemId(val)
    }
  },
  methods: {
    setItems(images = []){
      this.classifications.forEach(it => {
        it.images = []
      })
      images.forEach(it => {
        const sn = it.classification.sn || ''
        if(this.dict.hasOwnProperty(sn)){
          it.url = getMediaUrl(it)
          this.dict[sn].images.push(it)
        }
    })
    },
    setItemId(itemId = ''){
      this.topical = itemId
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
      const refer = this.itemType
      const type = Type.Image
      const classification = this.classification
      const media = { ...this.media, topical, refer, type, classification }
      if(!classification.sn){
        fail('请选择照片分类')
        return false
      }
      if(!media.mediaid){
        fail('请上传照片')
        return false
      }
      this.dict[classification.sn].images.push(media)
      return media
    },
    upload(){
      const media = this.getParams()
      if(media){
        createMedia(media)
        .then(() => {
          this.reset()
          success('上传成功')
        })
        .catch(catchHandler)
      }
    },
    classificationChangeHandler(picker, values){
      const { sn, name } = values[0]
      this.classification = { sn, name }
    }
  }
}
</script>

<style>
</style>
