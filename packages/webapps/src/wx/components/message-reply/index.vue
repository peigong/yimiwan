<template>
  <div>
    <wv-group title="回复主题">
      <wv-input placeholder="请输入回复主题"></wv-input>
    </wv-group>
    <wv-group title="回复内容">
      <wv-textarea placeholder="请输入回复内容" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-button type="primary">回复</wv-button>
  </div>
</template>

<script>
export default {
  name: 'message-reply',
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
