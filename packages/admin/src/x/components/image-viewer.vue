<template>
  <div>
    <el-dialog title="查看图片" :visible.sync="visible" width="60%" center>
      <image-list :items="items" />
    </el-dialog>
  </div>
</template>

<script>
import imageList from '@/x/components/image-list'

export default {
  props: ['items', 'bell'],
  components: {
    imageList
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
