<template>
  <div>
    <wv-group title="周培公">
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
export default {
  name: 'cv-post',
  props: [ 'itemId' ],
  components: {
  },
  data(){
    return {
      ctrl: {
        cv: false
      },
      cv: {},
      cvList: [
        {
          values: [
            { id: '1', title: '初级工程师简历' },
            { id: '2', title: '中级工程师简历' },
            { id: '3', title: '高级工程师简历' }
          ]
        }
      ]
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
