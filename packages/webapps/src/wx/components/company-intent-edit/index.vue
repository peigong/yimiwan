<template>
  <div>
    <wv-group title="基本信息">
      <wv-input label="岗位名称" placeholder="请输入岗位名称"></wv-input>
      <wv-input label="福利待遇" placeholder="请输入福利待遇"></wv-input>
      <wv-input label="工作时间" placeholder="请输入工作时间"></wv-input>
      <wv-input label="工作地址" placeholder="请输入工作地址"></wv-input>
    </wv-group>
    <wv-group title="工作内容">
      <wv-textarea placeholder="请输入工作内容" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-group title="工作要求">
      <wv-textarea placeholder="请输入工作要求" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-group title="备注说明">
      <wv-textarea placeholder="请输入备注说明" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-button type="primary">确定</wv-button>
  </div>
</template>

<script>
export default {
  name: 'company-intent-edit',
  props: [ 'itemId' ],
  components: {
  },
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
</style>
