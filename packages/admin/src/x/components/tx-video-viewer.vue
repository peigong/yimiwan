<template>
  <div>
    <el-dialog title="腾讯播放器" :visible.sync="visible" width="60%" center>
      <tx-video-list :items="items" />
    </el-dialog>
  </div>
</template>

<script>
import txVideoList from '@/x/components/tx-video-list'

export default {
  props: ['items', 'bell'],
  components: {
    txVideoList
  },
  data() {
    return {
      visible: false
    };
  },
  mounted(){
  },
  watch: {
    bell(){
      this.visible = true
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
