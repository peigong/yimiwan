<template>
  <div>
    <wv-group title="新时代教育公司">
      <wv-cell title="JD" is-link :value="job.title" @click.native="ctrl.job = true" />
      <wv-input label="附言" placeholder="请输入"></wv-input>
      <wv-button type="primary">约面试</wv-button>
    </wv-group>
    <wv-picker
      :visible.sync="ctrl.job"
      :columns="jobList"
      value-key="title"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: 'job-post',
  props: [ 'itemId' ],
  components: {
  },
  data(){
    return {
      ctrl: {
        job: false
      },
      job: {},
      jobList: [
        {
          values: [
            { id: '1', title: '初级教师JD' },
            { id: '2', title: '中级教师JD' },
            { id: '3', title: '高级教师JD' }
          ]
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    onChange(picker, values){
      this.job = values[0]
    }
  }
}
</script>

<style>
</style>
