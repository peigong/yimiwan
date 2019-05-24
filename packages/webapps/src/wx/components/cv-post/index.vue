<template>
  <div>
    <wv-group title="选择简历">
      <wv-cell title="简历" is-link :value="cv.title" @click.native="ctrl.cv = true" />
      <wv-input label="附言" placeholder="请输入"></wv-input>
      <wv-button type="primary">投简历</wv-button>
    </wv-group>
    <wv-picker
      :visible.sync="ctrl.cv"
      :columns="cvList"
      value-key="title"
      @change="onChange"
    />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getCVList } from '@/wx/service/cv'

export default {
  name: 'cv-post',
  props: [ 'itemId' ],
  components: {
  },
  mounted(){
    getCVList()
    .then((data) => {
      this.cvList[0].values = data
    })
    .catch(catchHandler)
  },
  data(){
    return {
      ctrl: {
        cv: false
      },
      cv: {},
      cvList: [{  values: [] }]
    }
  },
  computed: {
  },
  methods: {
    onChange(picker, values){
      this.cv = values[0]
    }
  }
}
</script>

<style>
</style>
