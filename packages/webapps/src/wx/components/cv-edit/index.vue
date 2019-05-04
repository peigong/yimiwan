<template>
  <div>
    <wv-group title="">
      <wv-input label="简历主题" placeholder="请输入简历主题"></wv-input>
    </wv-group>
    <wv-button type="primary">确定</wv-button>
  </div>
</template>

<script>
export default {
  name: 'cv-edit',
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
