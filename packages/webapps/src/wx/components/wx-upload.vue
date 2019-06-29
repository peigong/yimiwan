<template>
  <wv-cell :title="title" is-link @click="upload" />
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { chooseImage, uploadImage } from '@/wx/util/wx'

export default {
  name: 'wx-upload',
  props: [ 'label' ],
  components: {
  },
  data(){
    const title = `上传${ this.label }`
    return {
      title
    }
  },
  methods: {
    upload(){
      const media = {}
      chooseImage({
        sizeType: ['compressed'],
        count: 1 // 默认9
      })
      .then(res => {
        let localId = ''
        const localIds =  res.localIds || []
        if(localIds.length){
          localId = res.localIds[0]
          media.url = localId
        }
        return localId
      })
      .then(localId => uploadImage({ localId }))
      .then(res => {
        media.mediaid = res.serverId || ''; // 返回图片的服务器端ID
        this.$emit('changed', media)
      })
      .catch(catchHandler)
    },
  }
}
</script>

<style>
</style>
