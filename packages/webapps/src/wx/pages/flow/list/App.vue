<template>
  <div class="post-editor">
    <wv-tabs>
      <wv-tab title="招聘">
        <flow-list>
        </flow-list>
      </wv-tab>
      <wv-tab title="求职">
      </wv-tab>
      <wv-tab title="发布信息">
        <post-editor />
      </wv-tab>
    </wv-tabs>
  </div>
</template>

<script>
import postEditor from '@/wx/components/post-editor'

export default {
  name: 'app',
  components: {
    postEditor
  },
  mounted(){
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
.post-editor {
  padding-top: 10px;
}
</style>
